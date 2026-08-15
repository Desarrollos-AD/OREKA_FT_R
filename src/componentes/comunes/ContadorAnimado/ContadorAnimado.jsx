import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useEnPantalla } from '../../../ganchos/useEnPantalla'
import { prefiereMovimientoReducido } from '../../../utilidades/movimiento'
import './ContadorAnimado.scss'

/** Número que cuenta desde 0 hasta `hasta` cuando entra en pantalla.
 * `tono="oscuro"` (por defecto) es para usarse sobre fondos oscuros;
 * `tono="claro"` ajusta el color de la etiqueta para fondos claros. */
export function ContadorAnimado({ hasta, sufijo = '', etiqueta, tono = 'oscuro' }) {
  const [referenciaVisibilidad, enPantalla] = useEnPantalla()
  const referenciaNumero = useRef(null)

  useEffect(() => {
    if (!enPantalla || !referenciaNumero.current) return

    if (prefiereMovimientoReducido()) {
      referenciaNumero.current.textContent = `${hasta}${sufijo}`
      return
    }

    const objeto = { valor: 0 }
    gsap.to(objeto, {
      valor: hasta,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => {
        if (referenciaNumero.current) {
          referenciaNumero.current.textContent = `${Math.round(objeto.valor)}${sufijo}`
        }
      },
    })
  }, [enPantalla, hasta, sufijo])

  return (
    <div className={`contador-animado contador-animado--${tono}`} ref={referenciaVisibilidad}>
      <span className="contador-animado__numero" ref={referenciaNumero}>
        0{sufijo}
      </span>
      <span className="contador-animado__etiqueta">{etiqueta}</span>
    </div>
  )
}
