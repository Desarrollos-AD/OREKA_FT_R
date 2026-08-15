import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { relacionDePixelesSegura } from '../../../utilidades/movimiento'
import './TransicionCinematica.scss'

gsap.registerPlugin(ScrollTrigger)

const PROFUNDIDAD_TOTAL = 22

function Pilar({ posicion, rotacionY, color }) {
  return (
    <mesh position={posicion} rotation={[0, rotacionY, 0]}>
      <boxGeometry args={[0.5, 4.4, 0.5]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.32}
        roughness={0.15}
        metalness={0.1}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  )
}

function Pilares({ progreso }) {
  const grupo = useRef(null)
  const cantidad = 6
  const pilares = useMemo(
    () =>
      Array.from({ length: cantidad }, (_, i) => ({
        z: -(i * (PROFUNDIDAD_TOTAL / cantidad)) - 2,
        x: (i % 2 === 0 ? -1 : 1) * (1.6 + (i % 3) * 0.4),
        rotacionY: (i / cantidad) * Math.PI,
        color: i % 2 === 0 ? '#c9a05f' : '#e2621f',
      })),
    [cantidad],
  )

  useFrame(() => {
    if (!grupo.current) return
    // Un giro sutil de todo el conjunto acompaña el avance de la cámara.
    grupo.current.rotation.y = progreso.current * 0.35
  })

  return (
    <group ref={grupo}>
      {pilares.map((p, i) => (
        <Pilar key={i} posicion={[p.x, 0, p.z]} rotacionY={p.rotacionY} color={p.color} />
      ))}
    </group>
  )
}

function CamaraDolly({ progreso }) {
  useFrame((estado) => {
    const zObjetivo = 3 - progreso.current * PROFUNDIDAD_TOTAL
    estado.camera.position.z += (zObjetivo - estado.camera.position.z) * 0.08
    estado.camera.position.x = Math.sin(progreso.current * Math.PI * 2) * 0.4
    estado.camera.lookAt(0, 0, estado.camera.position.z - 6)
  })
  return null
}

function EscenaInterna({ progreso }) {
  return (
    <>
      <ambientLight intensity={0.4} color="#fff2df" />
      <pointLight position={[0, 2, 3]} intensity={1.2} color="#ffdba6" />
      <pointLight position={[0, -2, -10]} intensity={0.8} color="#e2621f" />
      <fog attach="fog" args={['#141312', 4, 18]} />
      <Pilares progreso={progreso} />
      <CamaraDolly progreso={progreso} />
    </>
  )
}

/**
 * Viaje cinemático por scroll: la cámara avanza entre pilares translúcidos
 * mientras se hace scroll dentro de la "pista" pasada por `referenciaPista`
 * (definida por la página, ver Inicio.jsx). Muestra 3 puntos de valor que
 * van apareciendo según el progreso.
 */
export default function TransicionCinematica({ referenciaPista, puntos = [] }) {
  const progreso = useRef(0)
  const [indiceActivo, setIndiceActivo] = useState(0)

  useEffect(() => {
    const pista = referenciaPista?.current
    if (!pista) return undefined

    const disparador = ScrollTrigger.create({
      trigger: pista,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        progreso.current = self.progress
        const indice = Math.min(puntos.length - 1, Math.floor(self.progress * puntos.length))
        setIndiceActivo((previo) => (previo === indice ? previo : indice))
      },
    })

    return () => disparador.kill()
  }, [referenciaPista, puntos.length])

  return (
    <div className="transicion-cinematica">
      <Canvas
        className="transicion-cinematica__lienzo"
        dpr={relacionDePixelesSegura()}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3], fov: 50 }}
      >
        <EscenaInterna progreso={progreso} />
      </Canvas>

      <div className="transicion-cinematica__velo" />

      <div className="transicion-cinematica__texto">
        {puntos.map((punto, indice) => (
          <div
            key={punto.titulo}
            className={`transicion-cinematica__punto ${
              indice === indiceActivo ? 'transicion-cinematica__punto--activo' : ''
            }`}
          >
            <span className="transicion-cinematica__numero">0{indice + 1}</span>
            <h3>{punto.titulo}</h3>
            <p>{punto.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
