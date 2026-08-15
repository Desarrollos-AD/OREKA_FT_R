import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { CampoDeParticulasPerezoso } from '../../componentes/tres/CampoDeParticulas'
import { HeroInterno } from '../../componentes/comunes/HeroInterno/HeroInterno'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { FilaAbogado } from '../../componentes/comunes/FilaAbogado/FilaAbogado'
import { Boton } from '../../componentes/comunes/Boton/Boton'
import { abogados } from '../../datos/abogados'
import './Abogados.scss'

export function Abogados() {
  return (
    <>
      <Head>
        <title>Abogados — OREKA Consorcio Jurídico</title>
        <meta name="description" content="Conocé al equipo de abogados de OREKA Consorcio Jurídico." />
      </Head>

      <HeroInterno
        epigrafe="Nuestro Equipo"
        titulo="Abogados que respaldan cada decisión"
        descripcion="Un equipo multidisciplinario con +15 años de experiencia legal combinada, especializado por materia y coordinado bajo una misma estrategia."
        fondo={<ClienteSolo Componente={CampoDeParticulasPerezoso} respaldo={<FondoEstatico variante="particulas" />} soloEscritorio />}
      />

      <Seccion tono="oscura">
        <div className="abogados__lista">
          {abogados.map((abogado, indice) => (
            <FilaAbogado key={abogado.id} abogado={abogado} invertida={indice % 2 === 1} />
          ))}
        </div>

        <div className="abogados__cta">
          <p className="u-parrafo-guia u-parrafo-guia--invertido">
            ¿Tu caso necesita más de una especialidad? Coordinamos internamente para darte una sola
            estrategia clara.
          </p>
          <Boton to="/contacto" variante="primario">
            Agenda una Consulta
          </Boton>
        </div>
      </Seccion>
    </>
  )
}

export default Abogados
export { Abogados as Component }
