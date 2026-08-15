import { TituloAnimado } from '../TituloAnimado/TituloAnimado'
import './HeroInterno.scss'

/**
 * Cabecera compartida por las páginas internas (Sobre la Firma, Servicios,
 * Abogados, Contacto). `fondo` recibe la escena Three.js correspondiente
 * (FondoShader o CampoDeParticulas), ya envuelta en <ClienteSolo/> por quien
 * la use.
 */
export function HeroInterno({ epigrafe, titulo, descripcion, fondo, children }) {
  return (
    <header className="hero-interno">
      <div className="hero-interno__fondo">{fondo}</div>
      <div className="hero-interno__velo" />

      <div className="hero-interno__contenido">
        {epigrafe && <span className="u-epigrafe hero-interno__epigrafe">{epigrafe}</span>}
        <TituloAnimado texto={titulo} como="h1" className="u-titulo-hero hero-interno__titulo" disparo="montaje" />
        {descripcion && <p className="u-parrafo-guia u-parrafo-guia--invertido">{descripcion}</p>}
        {children}
      </div>
    </header>
  )
}
