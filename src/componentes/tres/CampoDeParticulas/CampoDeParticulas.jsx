import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { relacionDePixelesSegura, esViewportAngosto } from '../../../utilidades/movimiento'
import './CampoDeParticulas.scss'

/**
 * Genera puntos distribuidos en una franja diagonal (retomando el corte
 * diagonal del hero de Figma) y, entre los puntos suficientemente cercanos,
 * segmentos de línea — evocando una red de personas/casos conectados.
 */
function generarCampo(cantidad) {
  const posiciones = new Float32Array(cantidad * 3)
  const ANCHO = 11
  const ALTO = 6.5

  for (let i = 0; i < cantidad; i += 1) {
    // sesgo diagonal: la coordenada x influye en el rango posible de y
    const x = (Math.random() - 0.5) * ANCHO
    const sesgo = (x / ANCHO) * ALTO * 0.6
    const y = (Math.random() - 0.5) * ALTO * 0.75 + sesgo
    const z = (Math.random() - 0.5) * 4
    posiciones.set([x, y, z], i * 3)
  }

  const lineas = []
  const UMBRAL = 1.15
  for (let i = 0; i < cantidad; i += 1) {
    for (let j = i + 1; j < cantidad; j += 1) {
      const dx = posiciones[i * 3] - posiciones[j * 3]
      const dy = posiciones[i * 3 + 1] - posiciones[j * 3 + 1]
      const dz = posiciones[i * 3 + 2] - posiciones[j * 3 + 2]
      const distancia = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (distancia < UMBRAL && Math.random() > 0.7) {
        lineas.push(
          posiciones[i * 3],
          posiciones[i * 3 + 1],
          posiciones[i * 3 + 2],
          posiciones[j * 3],
          posiciones[j * 3 + 1],
          posiciones[j * 3 + 2],
        )
      }
    }
  }

  return { posiciones, lineas: new Float32Array(lineas) }
}

function Campo() {
  const grupo = useRef(null)
  const cantidad = esViewportAngosto() ? 160 : 340
  const { posiciones, lineas } = useMemo(() => generarCampo(cantidad), [cantidad])
  const objetivoPuntero = useRef({ x: 0, y: 0 })

  useFrame((estado, delta) => {
    if (!grupo.current) return
    objetivoPuntero.current.x += (estado.pointer.x - objetivoPuntero.current.x) * 0.02
    objetivoPuntero.current.y += (estado.pointer.y - objetivoPuntero.current.y) * 0.02
    grupo.current.rotation.y += delta * 0.02
    grupo.current.rotation.x = objetivoPuntero.current.y * 0.08
    grupo.current.rotation.z = objetivoPuntero.current.x * -0.04
  })

  return (
    <group ref={grupo}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[posiciones, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#e2b06a"
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineas, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b8935a" transparent opacity={0.18} />
      </lineSegments>
    </group>
  )
}

/** Campo de partículas/líneas — hero de Abogados y franja CTA de Inicio. */
export default function CampoDeParticulas() {
  return (
    <Canvas
      className="campo-particulas"
      dpr={relacionDePixelesSegura()}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Campo />
    </Canvas>
  )
}
