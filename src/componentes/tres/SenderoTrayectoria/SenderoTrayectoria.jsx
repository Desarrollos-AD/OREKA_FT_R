import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { relacionDePixelesSegura } from '../../../utilidades/movimiento'
import './SenderoTrayectoria.scss'

gsap.registerPlugin(ScrollTrigger)

// Puntos de control de la FORMA de la curva (no de los hitos — los
// marcadores se reparten a lo largo de esta curva según cuántos hitos haya,
// ver <Marcador>). Asciende y avanza en profundidad; la cámara "vuela" a lo
// largo de ella a medida que se hace scroll.
const PUNTOS = [
  new THREE.Vector3(-2.6, -0.9, 2),
  new THREE.Vector3(-0.9, 0.35, -1.8),
  new THREE.Vector3(0.9, -0.35, -5.4),
  new THREE.Vector3(2.6, 0.85, -9),
]

function Marcador({ curva, progreso, indice, total }) {
  const referencia = useRef(null)
  const materialRef = useRef(null)
  const objetivoPropio = indice / (total - 1)
  // Posición fija a lo largo de la curva — no depende de un array de
  // puntos de control, así que el sendero admite cualquier cantidad de
  // marcadores/hitos sin tocar la forma de la curva.
  const posicion = useMemo(() => curva.getPointAt(objetivoPropio), [curva, objetivoPropio])

  useFrame(() => {
    const malla = referencia.current
    const material = materialRef.current
    if (!malla || !material) return

    const distancia = Math.abs(progreso.current - objetivoPropio)
    const cercania = THREE.MathUtils.clamp(1 - distancia * 4.5, 0, 1)

    const escala = 0.85 + cercania * 0.6
    malla.scale.setScalar(escala)
    material.emissiveIntensity = 0.3 + cercania * 1.6
    malla.rotation.y += 0.006
  })

  return (
    <mesh ref={referencia} position={posicion}>
      <icosahedronGeometry args={[0.32, 1]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#c9a05f"
        emissive="#e2621f"
        emissiveIntensity={0.3}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  )
}

function CamaraSendero({ curva, progreso }) {
  const { camera } = useThree()
  const posicionSuave = useRef(curva.getPointAt(0).clone())

  /* eslint-disable react-hooks/immutability -- mutar camera.position/.lookAt en cada
     frame es el patrón estándar de R3F para animar la cámara; no es estado de React. */
  useFrame(() => {
    const t = THREE.MathUtils.clamp(progreso.current, 0, 1)
    const tCamara = Math.max(0, t - 0.09)
    const tMira = Math.min(1, t + 0.12)

    const objetivoPos = curva.getPointAt(tCamara)
    posicionSuave.current.lerp(objetivoPos, 0.08)
    camera.position.copy(posicionSuave.current)
    camera.position.y += 0.15

    const mira = curva.getPointAt(tMira)
    camera.lookAt(mira)
  })
  /* eslint-enable react-hooks/immutability */

  return null
}

function EscenaInterna({ curva, progreso, cantidadHitos }) {
  const puntosLinea = useMemo(() => curva.getPoints(100), [curva])

  return (
    <>
      <ambientLight intensity={0.45} color="#fff2df" />
      <pointLight position={[0, 3, 2]} intensity={1.1} color="#ffdba6" />
      <pointLight position={[0, -2, -6]} intensity={0.9} color="#e2621f" />
      <fog attach="fog" args={['#141312', 3, 13]} />

      <Line points={puntosLinea} color="#a67c52" transparent opacity={0.45} lineWidth={1.5} />

      {Array.from({ length: cantidadHitos }, (_, indice) => (
        <Marcador key={indice} curva={curva} progreso={progreso} indice={indice} total={cantidadHitos} />
      ))}

      <CamaraSendero curva={curva} progreso={progreso} />
    </>
  )
}

/**
 * Viaje 3D por la trayectoria de la firma: la cámara recorre una curva con
 * un marcador dorado por hito, sincronizado al scroll dentro de la "pista"
 * pasada por `referenciaPista` (definida por SobreLaFirma.jsx). Muestra el
 * año y el texto del hito más cercano a la posición actual.
 */
export default function SenderoTrayectoria({ referenciaPista, hitos = [] }) {
  const progreso = useRef(0)
  const [indiceActivo, setIndiceActivo] = useState(0)
  const curva = useMemo(() => new THREE.CatmullRomCurve3(PUNTOS, false, 'catmullrom', 0.4), [])

  useEffect(() => {
    const pista = referenciaPista?.current
    if (!pista) return undefined

    const disparador = ScrollTrigger.create({
      trigger: pista,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        progreso.current = self.progress
        const indice = Math.min(hitos.length - 1, Math.round(self.progress * (hitos.length - 1)))
        setIndiceActivo((previo) => (previo === indice ? previo : indice))
      },
    })

    return () => disparador.kill()
  }, [referenciaPista, hitos.length])

  return (
    <div className="sendero-trayectoria">
      <Canvas
        className="sendero-trayectoria__lienzo"
        dpr={relacionDePixelesSegura()}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 55 }}
      >
        <EscenaInterna curva={curva} progreso={progreso} cantidadHitos={hitos.length} />
      </Canvas>

      <div className="sendero-trayectoria__velo" />

      <div className="sendero-trayectoria__texto">
        {hitos.map((hito, indice) => (
          <div
            key={hito.anio}
            className={`sendero-trayectoria__hito ${
              indice === indiceActivo ? 'sendero-trayectoria__hito--activo' : ''
            }`}
          >
            <span className="sendero-trayectoria__anio">{hito.anio}</span>
            <p>{hito.texto}</p>
          </div>
        ))}
      </div>

      <div className="sendero-trayectoria__progreso">
        {hitos.map((hito, indice) => (
          <span
            key={hito.anio}
            className={`sendero-trayectoria__punto ${
              indice === indiceActivo ? 'sendero-trayectoria__punto--activo' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}
