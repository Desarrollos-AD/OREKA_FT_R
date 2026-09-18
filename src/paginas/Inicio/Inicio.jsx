import { useEffect, useRef, useState } from 'react'
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
import { Icono } from '../../componentes/comunes/Icono/Icono'
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

const RAZONES = [
  {
    icono: 'escudo',
    titulo: 'Respaldo multidisciplinario',
    texto:
      'Un solo equipo que domina fiscal, mercantil, laboral, civil y familiar: menos intermediarios y más control sobre tu estrategia.',
  },
  {
    icono: 'reloj',
    titulo: 'Respuesta ágil',
    texto:
      'Analizamos cada caso con rapidez y te mantenemos al tanto de los tiempos procesales, sin sorpresas de última hora.',
  },
  {
    icono: 'maletin',
    titulo: 'Experiencia comprobada',
    texto:
      'Más de una década resolviendo asuntos ante autoridades administrativas y tribunales del fuero común y federal.',
  },
  {
    icono: 'balanza',
    titulo: 'Ética y transparencia',
    texto:
      'Honorarios claros desde el inicio y comunicación honesta sobre las posibilidades reales de cada asunto.',
  },
]

// Copy de ejemplo para ilustrar la sección — reemplazar por testimonios
// reales de clientes (con su autorización) antes de publicar.
const TESTIMONIOS = [
  {
    texto:
      'Nos ayudaron a resolver una controversia fiscal compleja con claridad y resultados medibles. El seguimiento fue constante en cada etapa.',
    nombre: 'Ana Martínez',
    cargo: 'Directora de Administración, empresa manufacturera',
  },
  {
    texto:
      'Su equipo laboral evitó que un conflicto interno se convirtiera en un problema mayor para la empresa. Profesionalismo y rapidez de principio a fin.',
    nombre: 'Roberto Cendejas',
    cargo: 'Gerente de Recursos Humanos',
  },
  {
    texto:
      'Explican cada paso legal en un lenguaje que entendemos, sin tecnicismos. Eso genera mucha confianza al momento de decidir.',
    nombre: 'Laura Domínguez',
    cargo: 'Cliente particular',
  },
]

// Iniciales para el avatar de cada testimonio (p. ej. "Ana Martínez" → "AM").
const obtenerIniciales = (nombre) =>
  nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join('')
    .toUpperCase()

export function Inicio() {
  const referenciaPista = useRef(null)
  const referenciaCarrusel = useRef(null)
  const [puedeIrAtras, setPuedeIrAtras] = useState(false)
  const [puedeIrAdelante, setPuedeIrAdelante] = useState(true)

  const actualizarEstadoCarrusel = () => {
    const pista = referenciaCarrusel.current
    if (!pista) return
    const maximoScroll = pista.scrollWidth - pista.clientWidth
    setPuedeIrAtras(pista.scrollLeft > 4)
    setPuedeIrAdelante(pista.scrollLeft < maximoScroll - 4)
  }

  useEffect(() => {
    actualizarEstadoCarrusel()
    window.addEventListener('resize', actualizarEstadoCarrusel)
    return () => window.removeEventListener('resize', actualizarEstadoCarrusel)
  }, [])

  const desplazarCarrusel = (direccion) => {
    const pista = referenciaCarrusel.current
    if (!pista) return
    const item = pista.querySelector('.inicio__carrusel-areas__item')
    const paso = item ? item.getBoundingClientRect().width + 24 : pista.clientWidth * 0.8
    pista.scrollBy({ left: direccion * paso, behavior: 'smooth' })
  }

  // Arrastre con el cursor (mouse/trackpad) además del scroll táctil nativo.
  const arrastre = useRef({ activo: false, seMovio: false, x: 0, scrollInicial: 0 })

  const iniciarArrastre = (evento) => {
    const pista = referenciaCarrusel.current
    if (!pista) return
    arrastre.current = {
      activo: true,
      seMovio: false,
      x: evento.pageX,
      scrollInicial: pista.scrollLeft,
    }
    pista.classList.add('inicio__carrusel-areas__pista--arrastrando')
    // Ojo: NO capturamos el puntero acá. Si se captura ya en el pointerdown,
    // el navegador retarga el pointerup/click resultante al contenedor
    // (la pista) en vez del elemento bajo el cursor — incluso en un clic
    // simple, sin arrastre real — y el <Link> de "Ver más" nunca recibe el
    // clic. Por eso se captura recién en moverArrastre, una vez confirmado
    // que hay arrastre de verdad.
  }

  const moverArrastre = (evento) => {
    const estado = arrastre.current
    const pista = referenciaCarrusel.current
    if (!estado.activo || !pista) return
    const delta = evento.pageX - estado.x
    if (Math.abs(delta) > 3 && !estado.seMovio) {
      estado.seMovio = true
      pista.setPointerCapture(evento.pointerId)
    }
    pista.scrollLeft = estado.scrollInicial - delta
  }

  const terminarArrastre = (evento) => {
    const pista = referenciaCarrusel.current
    if (!pista) return
    arrastre.current.activo = false
    pista.classList.remove('inicio__carrusel-areas__pista--arrastrando')
    if (pista.hasPointerCapture(evento.pointerId)) pista.releasePointerCapture(evento.pointerId)
    actualizarEstadoCarrusel()
  }

  // Evita que el arrastre dispare el clic de "Ver más" dentro de la tarjeta.
  const capturarClicTrasArrastre = (evento) => {
    if (arrastre.current.seMovio) {
      evento.preventDefault()
      evento.stopPropagation()
    }
  }

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
          {/* <ClienteSolo
            Componente={EscenaBalanzaPerezosa}
            respaldo={<FondoEstatico variante="balanza" />}
          /> */}
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
          <p className="u-parrafo-guia hero-inicio__parrafo">
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

      <Seccion tono="clara" className="inicio__razones">
        <div className="inicio__razones-layout">
          <div className="inicio__razones-intro">
            <span className="u-epigrafe">Por qué elegirnos</span>
            <TituloAnimado
              texto="Somos un consorcio pensado para acompañarte"
              como="h2"
              className="u-titulo-seccion"
            />
            <p className="inicio__razones-parrafo">
              Combinamos criterio jurídico, cercanía y visión de negocio para que cada decisión
              legal fortalezca a tu empresa.
            </p>
          </div>

          <ol className="inicio__razones-lista">
            {RAZONES.map((razon, indice) => (
              <li className="inicio__razon" key={razon.titulo}>
                <span className="inicio__razon-numero">{String(indice + 1).padStart(2, '0')}</span>
                <div className="inicio__razon-cuerpo">
                  <h3 className="inicio__razon-titulo">{razon.titulo}</h3>
                  <p className="inicio__razon-texto">{razon.texto}</p>
                </div>
                <span className="inicio__razon-icono">
                  <Icono nombre={razon.icono} tamano={22} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Seccion>

      <Seccion tono="clara">
        <span className="u-epigrafe">Áreas de práctica</span>
        <TituloAnimado texto="Materias que cubrimos" como="h2" className="u-titulo-seccion" />
        <p className="u-parrafo-guia">
          Un solo consorcio, todas las especialidades que tu empresa necesita para operar con
          tranquilidad legal.
        </p>

        <div className="inicio__carrusel-areas">
          <button
            type="button"
            className="inicio__carrusel-areas__flecha inicio__carrusel-areas__flecha--anterior"
            onClick={() => desplazarCarrusel(-1)}
            disabled={!puedeIrAtras}
            aria-label="Ver áreas anteriores"
          >
            <Icono nombre="flecha" tamano={20} />
          </button>

          <div
            className="inicio__carrusel-areas__pista"
            ref={referenciaCarrusel}
            onScroll={actualizarEstadoCarrusel}
            onPointerDown={iniciarArrastre}
            onPointerMove={moverArrastre}
            onPointerUp={terminarArrastre}
            onPointerCancel={terminarArrastre}
            onClickCapture={capturarClicTrasArrastre}
          >
            {areasDePractica.slice(0, 6).map((area) => (
              <div className="inicio__carrusel-areas__item" key={area.id}>
                <TarjetaServicio area={area} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="inicio__carrusel-areas__flecha inicio__carrusel-areas__flecha--siguiente"
            onClick={() => desplazarCarrusel(1)}
            disabled={!puedeIrAdelante}
            aria-label="Ver más áreas"
          >
            <Icono nombre="flecha" tamano={20} />
          </button>
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

      <Seccion tono="oscura" className="inicio__testimonios">
        <span className="u-epigrafe">Testimonios</span>
        <TituloAnimado
          texto="La confianza de quienes ya trabajaron con nosotros"
          como="h2"
          className="u-titulo-seccion"
        />

        <div className="inicio__testimonios-grilla">
          {TESTIMONIOS.map((testimonio) => (
            <blockquote className="inicio__testimonio" key={testimonio.nombre}>
              <span className="inicio__testimonio-comilla" aria-hidden="true">
                “
              </span>
              <p className="inicio__testimonio-texto">{testimonio.texto}</p>
              <footer className="inicio__testimonio-autor">
                <span className="inicio__testimonio-avatar" aria-hidden="true">
                  {obtenerIniciales(testimonio.nombre)}
                </span>
                <span className="inicio__testimonio-datos">
                  <span className="inicio__testimonio-nombre">{testimonio.nombre}</span>
                  <span className="inicio__testimonio-cargo">{testimonio.cargo}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </Seccion>

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
          <p className="u-parrafo-guia">
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
