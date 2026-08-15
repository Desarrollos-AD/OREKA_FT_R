// Utilidades compartidas de movimiento/rendimiento. Pensadas para llamarse
// solo del lado del cliente (dentro de efectos o de componentes envueltos en
// <ClienteSolo>) — todas son seguras si igual se evalúan en Node porque
// devuelven un valor por defecto conservador cuando no hay `window`.

/** true si el usuario pidió reducir animaciones en su sistema operativo. */
export function prefiereMovimientoReducido() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** true si el viewport es de tamaño "móvil" para efectos 3D más livianos. */
export function esViewportAngosto() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/** devicePixelRatio acotado a 2 para no reventar el presupuesto de GPU. */
export function relacionDePixelesSegura() {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, 2)
}

/** true si el navegador puede crear un contexto WebGL utilizable. */
export function puedeUsarWebGL() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  try {
    const lienzo = document.createElement('canvas')
    const contexto =
      lienzo.getContext('webgl2') ||
      lienzo.getContext('webgl') ||
      lienzo.getContext('experimental-webgl')
    return Boolean(contexto)
  } catch {
    return false
  }
}

/** true si conviene mostrar las escenas Three.js (WebGL disponible y sin pedido de reducir movimiento). */
export function puedeUsarEscenasPremium() {
  return puedeUsarWebGL() && !prefiereMovimientoReducido()
}

// Curvas de easing compartidas entre GSAP y CSS, para que la sensación de
// movimiento sea consistente en todo el sitio.
export const EASE_SALIDA = 'power3.out'
export const EASE_ENTRADA_SALIDA = 'power2.inOut'
export const EASE_SUAVE = 'sine.inOut'
