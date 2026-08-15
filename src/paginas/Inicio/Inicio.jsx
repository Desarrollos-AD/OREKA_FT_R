import { useRef } from 'react'
import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { EscenaBalanzaPerezosa } from '../../componentes/tres/EscenaBalanza'
import { CampoDeParticulasPerezoso } from '../../componentes/tres/CampoDeParticulas'
import { TransicionCinematicaPerezosa, RespaldoTransicion } from '../../componentes/tres/TransicionCinematica'
import { TituloAnimado } from '../../componentes/comunes/TituloAnimado/TituloAnimado'
import { Boton } from '../../componentes/comunes/Boton/Boton'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { TarjetaServicio } from '../../componentes/comunes/TarjetaServicio/TarjetaServicio'
import { ContadorAnimado } from '../../componentes/comunes/ContadorAnimado/ContadorAnimado'
import { areasDePractica } from '../../datos/areasDePractica'
import './Inicio.scss'

const PUNTOS_VALOR = [
  {
    titulo: 'Estrategia antes que reacción',
    texto: 'Anticipamos riesgos legales antes de que se conviertan en conflictos costosos.',
  },
  {
    titulo: 'Un equipo, todas las materias',
    texto: 'Mercantil, laboral, civil, familiar y más — coordinados bajo una sola estrategia.',
  },
  {
    titulo: 'Cercanía y claridad',
    texto: 'Explicamos cada decisión legal en términos claros, sin tecnicismos innecesarios.',
  },
]

const ESTADISTICAS = [
  { hasta: 12, sufijo: '+', etiqueta: 'Años de trayectoria' },
  { hasta: 8, sufijo: '', etiqueta: 'Áreas de práctica' },
  { hasta: 300, sufijo: '+', etiqueta: 'Casos atendidos' },
  { hasta: 98, sufijo: '%', etiqueta: 'Clientes satisfechos' },
]

export function Inicio() {
  const referenciaPista = useRef(null)

  return (
    <>
      <Head>
        <title>OREKA Consorcio Jurídico — Solidez y estrategia legal</title>
        <meta
          name="description"
          content="Consorcio jurídico multidisciplinario: derecho mercantil, laboral, civil, familiar y más. Estrategia legal sólida para tu empresa."
        />
      </Head>

      <header className="hero-inicio">
        <div className="hero-inicio__fondo">
          <ClienteSolo
            Componente={EscenaBalanzaPerezosa}
            respaldo={<FondoEstatico variante="balanza" />}
          />
        </div>
        <div className="hero-inicio__velo" />

        <div className="hero-inicio__contenido">
          <span className="u-epigrafe hero-inicio__epigrafe">Consorcio Jurídico</span>
          <TituloAnimado
            texto="Solidez y estrategia legal para tu empresa, en cada materia."
            como="h1"
            className="u-titulo-hero hero-inicio__titulo"
            disparo="montaje"
          />
          <p className="u-parrafo-guia u-parrafo-guia--invertido hero-inicio__parrafo">
            Acompañamos a empresas y particulares con asesoría legal integral: prevenimos riesgos,
            resolvemos conflictos y defendemos tus intereses en cada una de nuestras áreas de práctica.
          </p>
          <div className="hero-inicio__acciones">
            <Boton to="/contacto" variante="primario">
              Agenda una Consulta
            </Boton>
            <Boton to="/servicios" variante="fantasma" invertido>
              Conocé nuestras áreas
            </Boton>
          </div>
        </div>
      </header>

      <Seccion tono="oscura" className="franja-stats">
        <div className="franja-stats__grilla">
          {ESTADISTICAS.map((estadistica) => (
            <ContadorAnimado key={estadistica.etiqueta} tono="oscuro" {...estadistica} />
          ))}
        </div>
      </Seccion>

      <Seccion tono="clara">
        <span className="u-epigrafe">Áreas de práctica</span>
        <TituloAnimado texto="Materias que cubrimos" como="h2" className="u-titulo-seccion" />
        <p className="u-parrafo-guia">
          Un solo consorcio, todas las especialidades que tu empresa necesita para operar con
          tranquilidad legal.
        </p>

        <div className="inicio__grilla-areas">
          {areasDePractica.slice(0, 6).map((area) => (
            <TarjetaServicio key={area.id} area={area} />
          ))}
        </div>

        <div className="inicio__ver-todas">
          <Boton to="/servicios" variante="enlace">
            Ver todas las áreas de práctica
          </Boton>
        </div>
      </Seccion>

      <div className="inicio__pista-cinematica" ref={referenciaPista}>
        <div className="inicio__fija-cinematica">
          {/* Siempre en el HTML (prerenderizado, real para SEO/sin JS) — el
              vuelo 3D se monta encima una vez que hay WebGL disponible. */}
          <RespaldoTransicion puntos={PUNTOS_VALOR} />
          <ClienteSolo
            Componente={TransicionCinematicaPerezosa}
            respaldo={null}
            soloEscritorio
            referenciaPista={referenciaPista}
            puntos={PUNTOS_VALOR}
          />
        </div>
      </div>

      <header className="cta-final">
        <div className="cta-final__fondo">
          <ClienteSolo
            Componente={CampoDeParticulasPerezoso}
            respaldo={<FondoEstatico variante="particulas" />}
          />
        </div>
        <div className="cta-final__velo" />
        <div className="cta-final__contenido">
          <TituloAnimado
            texto="Hablemos de tu caso"
            como="h2"
            className="u-titulo-seccion cta-final__titulo"
          />
          <p className="u-parrafo-guia u-parrafo-guia--invertido">
            Agendá una consulta inicial y armemos juntos la estrategia legal que tu empresa necesita.
          </p>
          <Boton to="/contacto" variante="primario">
            Agenda una Consulta
          </Boton>
        </div>
      </header>
    </>
  )
}

export default Inicio
// Convención de React Router (route.lazy): el módulo debe exponer `Component`.
export { Inicio as Component }
