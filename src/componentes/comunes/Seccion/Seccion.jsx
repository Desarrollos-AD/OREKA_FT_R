import './Seccion.scss'

/**
 * Envoltorio de layout con el padding vertical y el contenedor centrado
 * consistentes en todo el sitio. `tono` controla el fondo (clara/oscura).
 */
export function Seccion({ tono = 'blanco', angosta = false, flex = false,className = '', children, ...resto}) {
  const clases = ['seccion', `seccion--${tono}`, className].filter(Boolean).join(' ')

  return (
    <section className={clases} {...resto}>
      <div className={`${flex ? 'seccion__contenedor--flex' : 'seccion__contenedor'} ${angosta ? 'seccion__contenedor--angosto' : ''}`}>
        {children}
      </div>
    </section>
  )
}
