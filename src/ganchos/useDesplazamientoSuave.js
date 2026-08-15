import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefiereMovimientoReducido } from '../utilidades/movimiento'

gsap.registerPlugin(ScrollTrigger)

/**
 * Inicializa el desplazamiento suave (Lenis) sincronizado con el ticker de
 * GSAP para que ScrollTrigger no se desfase. Se llama una única vez en el
 * layout raíz (DisenioBase). Si el usuario pidió reducir movimiento, se deja
 * el scroll nativo del navegador y ScrollTrigger igual funciona (sin inercia).
 */
export function useDesplazamientoSuave() {
  useEffect(() => {
    if (prefiereMovimientoReducido()) return undefined

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const alPaso = (tiempo) => {
      lenis.raf(tiempo * 1000)
    }
    gsap.ticker.add(alPaso)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(alPaso)
      lenis.destroy()
    }
  }, [])
}

export { gsap, ScrollTrigger }
