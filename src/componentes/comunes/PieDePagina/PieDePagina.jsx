import { Link } from 'react-router-dom'
import { Icono } from '../Icono/Icono'
import { areasDePractica } from '../../../datos/areasDePractica'
import { datosDeContacto } from '../../../datos/datosDeContacto'
import './PieDePagina.scss'

const ANIO_ACTUAL = new Date().getFullYear()

export function PieDePagina() {
  return (
    <footer className="pie-de-pagina">
      <div className="pie-de-pagina__contenido">
        <div className="pie-de-pagina__marca">
          <span className="pie-de-pagina__logo">OREKA</span>
          <p className="pie-de-pagina__eslogan">
            Solidez y estrategia legal para tu empresa, en cada materia.
          </p>
          <div className="pie-de-pagina__redes">
            {datosDeContacto.redes.map((red) => (
              <a key={red.id} href={red.url} target="_blank" rel="noreferrer" aria-label={red.etiqueta}>
                <Icono nombre={red.id} tamano={16} />
              </a>
            ))}
          </div>
        </div>

        <nav className="pie-de-pagina__columna" aria-label="Navegación">
          <h3 className="pie-de-pagina__titulo-columna">Navegación</h3>
          <Link to="/">Inicio</Link>
          <Link to="/sobre-la-firma">Sobre la Firma</Link>
          <Link to="/abogados">Abogados</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <nav className="pie-de-pagina__columna" aria-label="Áreas de práctica">
          <h3 className="pie-de-pagina__titulo-columna">Áreas de práctica</h3>
          {areasDePractica.slice(0, 6).map((area) => (
            <Link key={area.id} to={`/servicios#${area.id}`}>
              {area.titulo}
            </Link>
          ))}
        </nav>

        <div className="pie-de-pagina__columna">
          <h3 className="pie-de-pagina__titulo-columna">Contacto</h3>
          <a href={`tel:${datosDeContacto.telefono.replace(/\s/g, '')}`} className="pie-de-pagina__dato">
            <Icono nombre="telefono" tamano={16} />
            {datosDeContacto.telefono}
          </a>
          <a href={`mailto:${datosDeContacto.email}`} className="pie-de-pagina__dato">
            <Icono nombre="email" tamano={16} />
            {datosDeContacto.email}
          </a>
          <span className="pie-de-pagina__dato">
            <Icono nombre="ubicacion" tamano={16} />
            {datosDeContacto.direccion}
          </span>
        </div>
      </div>

      <div className="pie-de-pagina__inferior">
        <p>© {ANIO_ACTUAL} Oreka Consorcio Jurídico. Todos los derechos reservados.</p>
        <p className="pie-de-pagina__aviso">Sitio en construcción — contenido de ejemplo.</p>
      </div>
    </footer>
  )
}
