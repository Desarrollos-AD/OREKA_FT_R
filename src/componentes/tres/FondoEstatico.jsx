import './FondoEstatico.scss'

/**
 * Respaldo 100% CSS (sin JS ni WebGL) para cuando una escena Three.js todavía
 * no cargó, no hay soporte WebGL, o el usuario pidió reducir movimiento.
 * Se usa como `respaldo` de <ClienteSolo>.
 */
export function FondoEstatico({ variante = 'shader' }) {
  return <div className={`fondo-estatico fondo-estatico--${variante}`} aria-hidden="true" />
}
