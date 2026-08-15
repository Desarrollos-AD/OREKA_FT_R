import { useEnPantalla } from '../../../ganchos/useEnPantalla'
import './RespaldoTransicion.scss'

/**
 * Reemplazo sin Three.js de <TransicionCinematica>: se usa cuando no hay
 * WebGL, el usuario pidió reducir movimiento, o el viewport es angosto
 * (<768px, ver Inicio.jsx). Mismo contenido (los 3 puntos de valor), reveal
 * simple con CSS al entrar en pantalla en vez de scroll-scrub 3D.
 */
export function RespaldoTransicion({ puntos = [] }) {
  const [referencia, enPantalla] = useEnPantalla()

  return (
    <div className="respaldo-transicion" ref={referencia}>
      <div className="respaldo-transicion__fondo" />
      <div className={`respaldo-transicion__lista ${enPantalla ? 'respaldo-transicion__lista--visible' : ''}`}>
        {puntos.map((punto, indice) => (
          <div className="respaldo-transicion__punto" key={punto.titulo} style={{ transitionDelay: `${indice * 0.12}s` }}>
            <span className="respaldo-transicion__numero">0{indice + 1}</span>
            <h3>{punto.titulo}</h3>
            <p>{punto.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
