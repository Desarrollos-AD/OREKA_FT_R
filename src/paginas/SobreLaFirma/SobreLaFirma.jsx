import { useRef } from 'react'
import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { FondoShaderPerezoso } from '../../componentes/tres/FondoShader'
import { SenderoTrayectoriaPerezosa, RespaldoSendero } from '../../componentes/tres/SenderoTrayectoria'
import { HeroInterno } from '../../componentes/comunes/HeroInterno/HeroInterno'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { TituloAnimado } from '../../componentes/comunes/TituloAnimado/TituloAnimado'
import { ContadorAnimado } from '../../componentes/comunes/ContadorAnimado/ContadorAnimado'
import { Boton } from '../../componentes/comunes/Boton/Boton'
import { Icono } from '../../componentes/comunes/Icono/Icono'
import './SobreLaFirma.scss'

// Copy real tomado de la subpágina "Oreka — Nosotros" en Figma.
const PROCESO = [
  { icono: 'telefono', titulo: 'Atención Personalizada', texto: 'Cada cliente es único y merece soluciones adaptadas a sus necesidades específicas.' },
  { icono: 'documento', titulo: 'Comunicación Constante', texto: 'Te mantenemos informado en cada etapa, con lenguaje claro y sin tecnicismos innecesarios.' },
  { icono: 'grafico', titulo: 'Resultados Medibles', texto: 'Medimos nuestro trabajo por el impacto real que tiene en el negocio de cada cliente.' },
]

// "Nuestros Valores" de Figma: 01 a 06, solo número + título (sin bajada).
const VALORES = [
  { anio: '01', texto: 'Innovación Fiscal' },
  { anio: '02', texto: 'Cumplimiento Legal' },
  { anio: '03', texto: 'Resultados' },
  { anio: '04', texto: 'Confianza' },
  { anio: '05', texto: 'Colaboración' },
  { anio: '06', texto: 'Adaptabilidad' },
]

export function SobreLaFirma() {
  const referenciaPista = useRef(null)

  return (
    <>
      <Head>
        <title>Sobre la Firma — OREKA Consorcio Jurídico</title>
        <meta
          name="description"
          content="Conocé la misión, visión y valores de OREKA Consorcio Jurídico."
        />
      </Head>

      <HeroInterno
        epigrafe="Sobre la Firma"
        titulo="Firmeza jurídica y respaldo estratégico para tu negocio"
        descripcion="En Oreka Consorcio Jurídico combinamos visión fiscal, mercantil/civil y laboral para proteger y hacer crecer tu negocio."
        fondo={<ClienteSolo Componente={FondoShaderPerezoso} respaldo={<FondoEstatico variante="shader" />} />}
      >
        <div className="sobre-la-firma__hero-acciones">
          <Boton to="/contacto" variante="primario">
            Agenda una Consulta
          </Boton>
          <Boton to="/servicios" variante="fantasma" invertido>
            Conoce nuestras áreas
          </Boton>
          <span className="sobre-la-firma__insignia">
            <strong>+15</strong> años de experiencia legal
          </span>
        </div>
      </HeroInterno>

      <Seccion tono="oscura" className="sobre-la-firma__propuesta">
        <div className="sobre-la-firma__fondo-propuesta">
          <ClienteSolo Componente={FondoShaderPerezoso} respaldo={<FondoEstatico variante="shader" />} soloEscritorio />
        </div>

        <div className="sobre-la-firma__propuesta-contenido">
          <TituloAnimado texto="Propuesta de Valor" como="h2" className="u-titulo-seccion" />
          <p className="u-parrafo-guia u-parrafo-guia--invertido">
            Ofrecemos un enfoque integral y especializado en asesoría y litigio en materias fiscal,
            administrativo, corporativo, laboral, mercantil, civil y familiar.
          </p>
          <p className="u-parrafo-guia u-parrafo-guia--invertido">
            Nos diferenciamos por nuestra atención personalizada, la búsqueda constante de soluciones
            efectivas y nuestro firme compromiso con el bienestar y éxito de nuestros clientes.
          </p>

          <div className="sobre-la-firma__proceso">
            {PROCESO.map((paso) => (
              <div className="paso-proceso" key={paso.titulo}>
                <span className="paso-proceso__icono">
                  <Icono nombre={paso.icono} tamano={24} />
                </span>
                <h3 className="paso-proceso__titulo">{paso.titulo}</h3>
                <p className="paso-proceso__texto">{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </Seccion>

      <Seccion tono="clara">
        <div className="sobre-la-firma__mision-vision">
          <div className="bloque-mv">
            <span className="u-epigrafe">Misión</span>
            <p>
              Transformar la gestión fiscal de nuestros clientes a través de estrategias innovadoras,
              como la reingeniería fiscal y la optimización tributaria, garantizando cumplimiento legal
              y la reducción de la carga fiscal. Nos comprometemos a ofrecer soluciones personalizadas
              que fortalezcan su competitividad y crecimiento empresarial.
            </p>
          </div>
          <div className="bloque-mv__divisor" aria-hidden="true" />
          <div className="bloque-mv">
            <span className="u-epigrafe">Visión</span>
            <p>
              Ser el despacho jurídico-fiscal de referencia en México, reconocido por nuestra capacidad
              de diseñar estrategias fiscales innovadoras y efectivas, generando confianza y resultados
              tangibles para nuestros clientes, mientras promovemos un entorno de desarrollo profesional
              y excelencia.
            </p>
          </div>
        </div>
      </Seccion>

      <div className="sobre-la-firma__epigrafe-sendero">
        <span className="u-epigrafe">Nuestros Valores</span>
        <TituloAnimado texto="Lo que nos guía en cada caso" como="h2" className="u-titulo-seccion" />
      </div>

      <div className="sobre-la-firma__pista-sendero" ref={referenciaPista}>
        <div className="sobre-la-firma__fija-sendero">
          {/* Siempre en el HTML (prerenderizado, real para SEO/sin JS) — el
              vuelo 3D se monta encima una vez que hay WebGL disponible. */}
          <RespaldoSendero hitos={VALORES} />
          <ClienteSolo
            Componente={SenderoTrayectoriaPerezosa}
            respaldo={null}
            soloEscritorio
            referenciaPista={referenciaPista}
            hitos={VALORES}
          />
        </div>
      </div>

      <Seccion tono="clara" className="sobre-la-firma__stats">
        <div className="sobre-la-firma__grilla-stats">
          <ContadorAnimado tono="claro" hasta={15} sufijo="+" etiqueta="Años de experiencia legal" />
          <ContadorAnimado tono="claro" hasta={7} sufijo="" etiqueta="Áreas de práctica" />
          <ContadorAnimado tono="claro" hasta={300} sufijo="+" etiqueta="Casos atendidos" />
        </div>
      </Seccion>
    </>
  )
}

export default SobreLaFirma
export { SobreLaFirma as Component }
