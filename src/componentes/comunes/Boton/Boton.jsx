import { Link } from 'react-router-dom'
import './Boton.scss'

/**
 * Botón/enlace reutilizable. Si recibe `to`, renderiza un <Link> de
 * react-router; si recibe `href`, una etiqueta <a> normal; si no, un
 * <button>.
 */
export function Boton({
  children,
  to,
  href,
  variante = 'primario',
  invertido = false,
  tipo = 'button',
  className = '',
  ...resto
}) {
  const clases = [
    'boton',
    `boton--${variante}`,
    invertido && 'boton--invertido',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={clases} {...resto}>
        <span className="boton__etiqueta">{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={clases} {...resto}>
        <span className="boton__etiqueta">{children}</span>
      </a>
    )
  }

  return (
    <button type={tipo} className={clases} {...resto}>
      <span className="boton__etiqueta">{children}</span>
    </button>
  )
}
