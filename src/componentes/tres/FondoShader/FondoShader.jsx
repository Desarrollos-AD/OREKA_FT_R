import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { relacionDePixelesSegura } from '../../../utilidades/movimiento'
import './FondoShader.scss'

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTiempo;
  uniform vec3 uColorCarbon;
  uniform vec3 uColorOro;
  uniform vec3 uColorNaranja;

  // ruido barato basado en hash — suficiente para un grano sutil
  float ruido(vec2 st) {
    return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;

    float onda = sin(uv.x * 2.4 + uTiempo * 0.06) * 0.12
               + sin(uv.y * 3.1 - uTiempo * 0.04) * 0.08;

    float mezcla = smoothstep(0.0, 1.0, uv.y + onda);
    vec3 color = mix(uColorCarbon, uColorOro * 0.35 + uColorNaranja * 0.15, mezcla * 0.55);

    // viñeta suave hacia los bordes
    float distancia = distance(uv, vec2(0.5));
    color = mix(color, uColorCarbon, smoothstep(0.25, 0.75, distancia) * 0.5);

    // grano
    float grano = (ruido(uv * vec2(400.0, 400.0) + uTiempo * 0.5) - 0.5) * 0.035;
    color += grano;

    gl_FragColor = vec4(color, 1.0);
  }
`

function Plano() {
  const { viewport } = useThree()
  // Ref al material montado (no se lee durante el render, solo dentro de
  // useFrame) para tocar el uniform en cada frame sin pasar por React.
  const referenciaMaterial = useRef(null)

  useFrame((estado) => {
    if (referenciaMaterial.current) {
      referenciaMaterial.current.uniforms.uTiempo.value = estado.clock.elapsedTime
    }
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={referenciaMaterial}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={{
          uTiempo: { value: 0 },
          uColorCarbon: { value: new THREE.Color('#141312') },
          uColorOro: { value: new THREE.Color('#b8935a') },
          uColorNaranja: { value: new THREE.Color('#e2621f') },
        }}
      />
    </mesh>
  )
}

/** Fondo shader ambiental (degradé carbón/dorado en movimiento lento + grano). */
export default function FondoShader() {
  return (
    <Canvas
      className="fondo-shader"
      dpr={relacionDePixelesSegura()}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 1] }}
    >
      <Plano />
    </Canvas>
  )
}
