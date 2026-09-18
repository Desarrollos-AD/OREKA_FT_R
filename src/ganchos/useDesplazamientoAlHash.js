import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Mismo valor que el scroll-margin-top de .fila-servicio: alto aproximado
// del encabezado fijo, para que el ancla no quede tapada por él.
const DESPLAZAMIENTO_ANCLA = 112

/**
 * Al navegar a una URL con #ancla (p. ej. /servicios#fiscal) hace scroll
 * suave hasta el elemento con ese id, tanto si la página ya estaba montada
 * (cambio de hash en el mismo lugar) como si recién se cargó (lazy) y el
 * elemento todavía no existe en el DOM. Usa la instancia de Lenis si ya está
 * lista (ver useDesplazamientoSuave) para no pelearse con su scroll virtual;
 * si no, cae a un scrollIntoView nativo.
 */
export function useDesplazamientoAlHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return undefined

    const id = hash.slice(1)
    let intentos = 0
    let idTiempo

    const intentarDesplazar = () => {
      const elemento = document.getElementById(id)
      if (elemento) {
        if (window.__lenis) {
          window.__lenis.scrollTo(elemento, { offset: -DESPLAZAMIENTO_ANCLA })
        } else {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        return
      }
      intentos += 1
      if (intentos < 20) {
        idTiempo = setTimeout(intentarDesplazar, 100)
      }
    }

    idTiempo = setTimeout(intentarDesplazar, 60)

    return () => clearTimeout(idTiempo)
  }, [hash, pathname])
}
