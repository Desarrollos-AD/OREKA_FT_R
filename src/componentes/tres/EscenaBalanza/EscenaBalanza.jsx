import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { relacionDePixelesSegura, esViewportAngosto } from '../../../utilidades/movimiento'
import './EscenaBalanza.scss'

const COLOR_ORO = '#c9a05f'
const COLOR_ORO_OSCURO = '#8a6a3c'

function Platillo({ posicionX }) {
  return (
    <group position={[posicionX, 1.28, 0]}>
      {/* cadenas estilizadas */}
      <mesh position={[-0.16, -0.55, 0]} rotation={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 6]} />
        <meshStandardMaterial color={COLOR_ORO} metalness={0.85} roughness={0.35} />
      </mesh>
      <mesh position={[0.16, -0.55, 0]} rotation={[0, 0, -0.06]}>
        <cylinderGeometry args={[0.012, 0.012, 1.1, 6]} />
        <meshStandardMaterial color={COLOR_ORO} metalness={0.85} roughness={0.35} />
      </mesh>
      {/* platillo */}
      <mesh position={[0, -1.12, 0]}>
        <cylinderGeometry args={[0.58, 0.4, 0.16, 40, 1, true]} />
        <meshStandardMaterial
          color={COLOR_ORO}
          metalness={0.9}
          roughness={0.28}
          side={2}
        />
      </mesh>
      <mesh position={[0, -1.19, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.03, 40]} />
        <meshStandardMaterial color={COLOR_ORO_OSCURO} metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  )
}

function GrupoBalanza() {
  const referenciaGrupo = useRef(null)
  const referenciaViga = useRef(null)
  const objetivoPuntero = useRef({ x: 0, y: 0 })

  useFrame((estado) => {
    const grupo = referenciaGrupo.current
    const viga = referenciaViga.current
    if (!grupo || !viga) return

    // Parpadeo de "respiración" + seguimiento sutil del puntero.
    objetivoPuntero.current.x += (estado.pointer.x - objetivoPuntero.current.x) * 0.03
    objetivoPuntero.current.y += (estado.pointer.y - objetivoPuntero.current.y) * 0.03

    grupo.rotation.y = objetivoPuntero.current.x * 0.28
    grupo.rotation.x = objetivoPuntero.current.y * -0.06
    viga.rotation.z = Math.sin(estado.clock.elapsedTime * 0.6) * 0.025 + objetivoPuntero.current.x * 0.04
  })

  return (
    <group ref={referenciaGrupo} position={[0, -0.3, 0]} scale={0.75}>
      {/* base */}
      <mesh position={[0, -2.55, 0]}>
        <cylinderGeometry args={[1.05, 1.2, 0.28, 48]} />
        <meshStandardMaterial color={COLOR_ORO_OSCURO} metalness={0.8} roughness={0.4} />
      </mesh>
      {/* columna */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 3.5, 24]} />
        <meshStandardMaterial color={COLOR_ORO} metalness={0.85} roughness={0.3} />
      </mesh>
      {/* remate superior */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshStandardMaterial color={COLOR_ORO} metalness={0.9} roughness={0.25} />
      </mesh>
      {/* viga */}
      <group ref={referenciaViga} position={[0, 1.28, 0]}>
        <mesh>
          <boxGeometry args={[3.7, 0.09, 0.09]} />
          <meshStandardMaterial color={COLOR_ORO} metalness={0.9} roughness={0.25} />
        </mesh>
      </group>
      <Platillo posicionX={-1.8} />
      <Platillo posicionX={1.8} />
    </group>
  )
}

function EscenaInterna() {
  return (
    <>
      <ambientLight intensity={0.55} color="#fff2df" />
      <directionalLight position={[3, 4, 4]} intensity={2.4} color="#ffdba6" />
      <directionalLight position={[-4, 1, -2]} intensity={0.9} color="#ff8a4c" />
      <pointLight position={[1.6, -1, 4]} intensity={0.8} color="#e2621f" />
      <fog attach="fog" args={['#141312', 7, 14]} />
      <ImpulsoEntrada />
    </>
  )
}

/** Monta la balanza a escala 0 y la revela con un pequeño rebote elástico.
 * Se posiciona a la derecha del centro (donde el hero deja espacio libre,
 * ya que el texto ocupa la mitad izquierda) y levemente hacia arriba para
 * que la base no quede cortada por el encuadre de la cámara. */
function ImpulsoEntrada() {
  const referencia = useRef(null)

  return (
    <group
      position={[2.5, 0.55, 0]}
      ref={(instancia) => {
        if (instancia && !referencia.current) {
          referencia.current = instancia
          instancia.scale.set(0.001, 0.001, 0.001)
          gsap.to(instancia.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 1.6,
            delay: 0.15,
            ease: 'elastic.out(0.7, 0.55)',
          })
        }
      }}
    >
      <GrupoBalanza />
    </group>
  )
}

/** Escena 3D: hero de Inicio. Balanza estilizada en tonos dorados. */
export default function EscenaBalanza() {
  const [dpr] = useState(() => relacionDePixelesSegura())
  const camaraZ = esViewportAngosto() ? 8.5 : 6.6

  return (
    <Canvas
      className="escena-balanza"
      dpr={dpr}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0.3, camaraZ], fov: 38 }}
    >
      <EscenaInterna />
    </Canvas>
  )
}
