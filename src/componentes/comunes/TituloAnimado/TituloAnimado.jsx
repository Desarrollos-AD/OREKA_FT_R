import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefiereMovimientoReducido, EASE_SALIDA } from '../../../utilidades/movimiento'
import './TituloAnimado.scss'

gsap.registerPlugin(SplitText, ScrollTrigger)

/**
 * Título con reveal de líneas carácter por carácter (GSAP SplitText).
 * - `disparo="montaje"`: anima apenas se monta (para el hero).
 * - `disparo="scroll"`: anima cuando entra al viewport (ScrollTrigger).
 * Si el usuario pidió reducir movimiento, se muestra el texto plano y quieto.
 * El texto en sí siempre está presente en el HTML (SplitText se aplica en
 * cliente), así que el prerender/SEO ve el contenido completo igual.
 */
export function TituloAnimado({
  texto,
  como: Etiqueta = 'h2',
  className = '',
  disparo = 'scroll',
  retraso = 0,
  ...resto
}) {
  const referencia = useRef(null)

  useLayoutEffect(() => {
    const elemento = referencia.current
    if (!elemento || prefiereMovimientoReducido()) return undefined

    const contexto = gsap.context(() => {
      const split = new SplitText(elemento, { type: 'lines,chars', linesClass: 'titulo-animado__linea' })

      gsap.set(split.chars, { yPercent: 110, opacity: 0 })

      const animacion = gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: EASE_SALIDA,
        stagger: 0.014,
        delay: retraso,
        scrollTrigger:
          disparo === 'scroll'
            ? { trigger: elemento, start: 'top 85%', once: true }
            : undefined,
      })

      return () => {
        animacion.kill()
        split.revert()
      }
    }, elemento)

    return () => contexto.revert()
  }, [texto, disparo, retraso])

  return (
    <Etiqueta ref={referencia} className={`titulo-animado ${className}`.trim()} {...resto}>
      {texto}
    </Etiqueta>
  )
}
