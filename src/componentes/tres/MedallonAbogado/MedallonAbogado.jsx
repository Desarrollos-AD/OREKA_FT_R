import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { relacionDePixelesSegura } from '../../../utilidades/movimiento'
import './MedallonAbogado.scss'

/** Gema facetada dorada que gira lento y acelera/se agranda sutilmente al
 * pasar el mouse — reemplaza la típica foto de perfil cuando no hay una
 * real, sin fingir una fotografía que no existe. */
function Gema() {
  const referencia = useRef(null)
  const sobreVuelo = useRef(false)

  useFrame((_, delta) => {
    const malla = referencia.current
    if (!malla) return

    const velocidad = sobreVuelo.current ? 1.5 : 0.35
    malla.rotation.y += delta * velocidad
    malla.rotation.x += delta * velocidad * 0.45

    const objetivo = sobreVuelo.current ? 1.15 : 1
    malla.scale.x += (objetivo - malla.scale.x) * 0.12
    malla.scale.y += (objetivo - malla.scale.y) * 0.12
    malla.scale.z += (objetivo - malla.scale.z) * 0.12
  })

  return (
    <mesh
      ref={referencia}
      onPointerOver={() => {
        sobreVuelo.current = true
      }}
      onPointerOut={() => {
        sobreVuelo.current = false
      }}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#c9a05f"
        metalness={0.9}
        roughness={0.22}
        emissive="#6b4a1f"
        emissiveIntensity={0.15}
        flatShading
      />
    </mesh>
  )
}

function EscenaInterna() {
  return (
    <>
      <ambientLight intensity={0.6} color="#fff2df" />
      <directionalLight position={[2, 3, 3]} intensity={1.8} color="#ffdba6" />
      <directionalLight position={[-2, -1, -2]} intensity={0.5} color="#ff8a4c" />
      <Gema />
    </>
  )
}

/** Medallón 3D para las tarjetas de Abogados. Canvas pequeño y transparente:
 * el degradé de fondo de la tarjeta se ve detrás de la gema. */
export default function MedallonAbogado() {
  return (
    <Canvas
      className="medallon-abogado"
      dpr={relacionDePixelesSegura()}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3], fov: 40 }}
    >
      <EscenaInterna />
    </Canvas>
  )
}
