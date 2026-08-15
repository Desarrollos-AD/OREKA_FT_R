import { useEnPantalla } from '../../../ganchos/useEnPantalla'
import './RespaldoSendero.scss'

/** Reemplazo sin Three.js de <SenderoTrayectoria>: sin WebGL, con
 * movimiento reducido, o en viewports angostos. Mismos hitos, reveal simple
 * al entrar en pantalla en vez del vuelo 3D por la curva. */
export function RespaldoSendero({ hitos = [] }) {
  const [referencia, enPantalla] = useEnPantalla()

  return (
    <div className="respaldo-sendero" ref={referencia}>
      <div className="respaldo-sendero__fondo" />
      <div className={`respaldo-sendero__lista ${enPantalla ? 'respaldo-sendero__lista--visible' : ''}`}>
        {hitos.map((hito, indice) => (
          <div
            className="respaldo-sendero__hito"
            key={hito.anio}
            style={{ transitionDelay: `${indice * 0.1}s` }}
          >
            <span className="respaldo-sendero__numero">0{indice + 1}</span>
            <span className="respaldo-sendero__anio">{hito.anio}</span>
            <p>{hito.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
