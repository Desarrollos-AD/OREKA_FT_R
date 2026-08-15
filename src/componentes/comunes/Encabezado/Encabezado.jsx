import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Boton } from '../Boton/Boton'
import { Icono } from '../Icono/Icono'
import { datosDeContacto } from '../../../datos/datosDeContacto'
import './Encabezado.scss'

const ENLACES = [
  { to: '/', etiqueta: 'Inicio' },
  { to: '/sobre-la-firma', etiqueta: 'Sobre la Firma' },
  { to: '/abogados', etiqueta: 'Abogados' },
  { to: '/servicios', etiqueta: 'Servicios' },
  { to: '/contacto', etiqueta: 'Contacto' },
]

export function Encabezado() {
  const [conFondo, setConFondo] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const alDesplazar = () => setConFondo(window.scrollY > 24)
    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [])

  // Cierra el menú móvil al cambiar de tamaño a escritorio.
  useEffect(() => {
    const alRedimensionar = () => {
      if (window.innerWidth >= 768) setMenuAbierto(false)
    }
    window.addEventListener('resize', alRedimensionar)
    return () => window.removeEventListener('resize', alRedimensionar)
  }, [])

  return (
    <header className={`encabezado ${conFondo ? 'encabezado--con-fondo' : ''}`}>
      <div className="encabezado__franja">
        <div className="encabezado__franja-interior">
          <a className="encabezado__dato" href={`tel:${datosDeContacto.telefono.replace(/\s/g, '')}`}>
            <Icono nombre="telefono" tamano={14} />
            {datosDeContacto.telefono}
          </a>
          <a className="encabezado__dato" href={`mailto:${datosDeContacto.email}`}>
            <Icono nombre="email" tamano={14} />
            {datosDeContacto.email}
          </a>
          <div className="encabezado__redes">
            {datosDeContacto.redes.map((red) => (
              <a
                key={red.id}
                href={red.url}
                target="_blank"
                rel="noreferrer"
                aria-label={red.etiqueta}
                className="encabezado__red"
              >
                <Icono nombre={red.id} tamano={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="encabezado__principal">
        <NavLink to="/" className="encabezado__logo" onClick={() => setMenuAbierto(false)}>
          <span className="encabezado__logo-marca">OREKA</span>
          <span className="encabezado__logo-sub">Consorcio Jurídico</span>
        </NavLink>

        <nav className="encabezado__nav" aria-label="Navegación principal">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === '/'}
              className={({ isActive }) =>
                `encabezado__enlace ${isActive ? 'encabezado__enlace--activo' : ''}`
              }
            >
              {enlace.etiqueta}
            </NavLink>
          ))}
        </nav>

        <div className="encabezado__acciones">
          <Boton to="/contacto" variante="primario" className="encabezado__cta">
            Agenda una Consulta
          </Boton>
          <button
            type="button"
            className="encabezado__disparador-menu"
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuAbierto((valor) => !valor)}
          >
            <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} />
          </button>
        </div>
      </div>

      <nav
        id="menu-movil"
        className={`encabezado__menu-movil ${menuAbierto ? 'encabezado__menu-movil--abierto' : ''}`}
        aria-label="Navegación móvil"
      >
        <div className="encabezado__menu-movil-interior">
          {ENLACES.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              end={enlace.to === '/'}
              className="encabezado__enlace-movil"
              onClick={() => setMenuAbierto(false)}
            >
              {enlace.etiqueta}
            </NavLink>
          ))}
          <Boton to="/contacto" variante="primario" onClick={() => setMenuAbierto(false)}>
            Agenda una Consulta
          </Boton>
        </div>
      </nav>
    </header>
  )
}
