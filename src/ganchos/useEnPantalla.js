import { useEffect, useRef, useState } from 'react'

/**
 * Devuelve una ref y un booleano que pasa a `true` cuando el elemento entra
 * en el viewport. Pensado para disparar animaciones de entrada livianas sin
 * depender de GSAP ScrollTrigger en cada componente chico.
 */
export function useEnPantalla({ margen = '0px 0px -10% 0px', unaVez = true } = {}) {
  const referencia = useRef(null)
  const [enPantalla, setEnPantalla] = useState(false)

  useEffect(() => {
    const elemento = referencia.current
    if (!elemento || typeof IntersectionObserver === 'undefined') {
      setEnPantalla(true) // sin soporte: mostrar el contenido directamente
      return undefined
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEnPantalla(true)
          if (unaVez) observador.disconnect()
        } else if (!unaVez) {
          setEnPantalla(false)
        }
      },
      { rootMargin: margen, threshold: 0.15 },
    )

    observador.observe(elemento)
    return () => observador.disconnect()
  }, [margen, unaVez])

  return [referencia, enPantalla]
}
