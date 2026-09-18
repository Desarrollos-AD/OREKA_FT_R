import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { relacionDePixelesSegura } from '../../../utilidades/movimiento'
import './ListonesDorados.scss'

const VERTEX = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTiempo;
  uniform float uAmplitud;
  uniform float uFrecuencia;
  uniform float uFase;
  uniform float uVelocidad;

  void main() {
    vUv = uv;
    vec3 posicion = position;

    // Onda principal + una segunda armónica más rápida y suave — evita que
    // el listón se vea como un seno perfecto, más parecido a tela real.
    float onda = sin(uv.x * uFrecuencia + uTiempo * uVelocidad + uFase) * uAmplitud;
    onda += sin(uv.x * uFrecuencia * 2.3 - uTiempo * uVelocidad * 0.6 + uFase * 1.7) * uAmplitud * 0.22;
    posicion.y += onda;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(posicion, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTiempo;
  uniform vec3 uColorClaro;
  uniform vec3 uColorOscuro;
  uniform float uOpacidad;

  void main() {
    // Bordes suaves: el listón se desvanece hacia sus dos costados (ancho)
    // y hacia sus dos extremos (largo), nunca corta en seco.
    float bordeAncho = smoothstep(0.0, 0.22, vUv.y) * (1.0 - smoothstep(0.78, 1.0, vUv.y));
    float bordeLargo = smoothstep(0.0, 0.1, vUv.x) * (1.0 - smoothstep(0.9, 1.0, vUv.x));

    vec3 color = mix(uColorOscuro, uColorClaro, vUv.y);

    // Brillo que recorre el largo del listón, como un reflejo de seda.
    float brillo = pow(max(sin(vUv.x * 5.0 - uTiempo * 0.32), 0.0), 6.0);
    color += brillo * 0.5;

    float alpha = bordeAncho * bordeLargo * uOpacidad;
    gl_FragColor = vec4(color, alpha);
  }
`

/**
 * Un listón de luz — plano alargado deformado en el vertex shader como una
 * onda senoidal (tela/seda ondulando), con bordes translúcidos y un brillo
 * que recorre su largo. Varias instancias superpuestas y rotadas componen
 * la escena "aurora dorada".
 */
function Liston({ posicion, rotacion, escala, fase, velocidad, frecuencia, amplitud, opacidad }) {
  const referenciaMaterial = useRef(null)

  useFrame((estado) => {
    if (referenciaMaterial.current) {
      referenciaMaterial.current.uniforms.uTiempo.value = estado.clock.elapsedTime
    }
  })

  const uniformes = useMemo(
    () => ({
      uTiempo: { value: 0 },
      uAmplitud: { value: amplitud },
      uFrecuencia: { value: frecuencia },
      uFase: { value: fase },
      uVelocidad: { value: velocidad },
      uColorClaro: { value: new THREE.Color('#e6b877') },
      uColorOscuro: { value: new THREE.Color('#7a5228') },
      uOpacidad: { value: opacidad },
    }),
    [amplitud, frecuencia, fase, velocidad, opacidad],
  )

  return (
    <mesh position={posicion} rotation={rotacion} scale={escala}>
      <planeGeometry args={[1, 1, 120, 1]} />
      <shaderMaterial
        ref={referenciaMaterial}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniformes}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Composición fija de 3 listones — pocos y grandes, para una lectura sobria
// (nada de "ruido" de muchos elementos pequeños). Mantiene el corte
// diagonal que ya usan otras escenas del sitio.
const CONFIGURACIONES = [
  { x: 0, y: 0, z: 0, rotZ: 0.1, anchoRel: 1.2, altoRel: 0.5, fase: 0, velocidad: 0.35, frecuencia: 3.4, amplitud: 0.15, opacidad: 1 },
]

function Cintas() {
  const { viewport } = useThree()
  const grupo = useRef(null)
  const objetivoPuntero = useRef({ x: 0, y: 0 })

  useFrame((estado) => {
    if (!grupo.current) return
    // Paralaje muy sutil siguiendo el puntero — mismo lenguaje de
    // interacción que el resto de las escenas del sitio.
    objetivoPuntero.current.x += (estado.pointer.x - objetivoPuntero.current.x) * 0.02
    objetivoPuntero.current.y += (estado.pointer.y - objetivoPuntero.current.y) * 0.02
    grupo.current.rotation.z = objetivoPuntero.current.x * -0.02
    grupo.current.rotation.x = objetivoPuntero.current.y * 0.015
  })

  return (
    <group ref={grupo}>
      {CONFIGURACIONES.map((c, indice) => (
        <Liston
          key={indice}
          posicion={[viewport.width * c.x * 0.5, viewport.height * c.y * 0.35, c.z]}
          rotacion={[0, 0, c.rotZ]}
          escala={[viewport.width * c.anchoRel, viewport.height * c.altoRel, 1]}
          fase={c.fase}
          velocidad={c.velocidad}
          frecuencia={c.frecuencia}
          amplitud={c.amplitud}
          opacidad={c.opacidad}
        />
      ))}
    </group>
  )
}

/**
 * Fondo ambiental de los heroes internos (Abogados, Contacto, Servicios,
 * Sobre la Firma): listones dorados translúcidos que ondulan lentamente
 * como seda, con un brillo recorriendo su largo. Reemplaza al degradé
 * shader plano y al campo de partículas — más elegante y acorde a una
 * firma jurídica.
 */
export default function ListonesDorados() {
  return (
    <Canvas
      className="listones-dorados"
      dpr={relacionDePixelesSegura()}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 5], fov: 42 }}
    >
      <Cintas />
    </Canvas>
  )
}
