import { Link } from 'react-router-dom'
import { Icono } from '../Icono/Icono'
import './TarjetaServicio.scss'

/** Tarjeta de vista previa de un área de práctica (usada en Inicio y en el
 * pie de página). El detalle completo vive en la página de Servicios, en
 * <FilaServicio>. */
export function TarjetaServicio({ area, className = '' }) {
  return (
    <article className={`tarjeta-servicio ${className}`.trim()}>
      <div className="tarjeta-servicio__cabecera">
        <span className="tarjeta-servicio__icono">
          <img src={area.icono} alt={area.icono} />
        </span>
        <span className="tarjeta-servicio__numero">{area.numero}</span>
      </div>

      <h3 className="tarjeta-servicio__titulo">{area.titulo}</h3>
      <p className="tarjeta-servicio__resumen">{area.resumen}</p>

      <Link to={`/servicios#${area.id}`} className="tarjeta-servicio__enlace">
        Ver más
        <Icono nombre="flecha" tamano={16} />
      </Link>
    </article>
  );
}
