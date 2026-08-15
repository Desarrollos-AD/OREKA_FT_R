import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { FondoShaderPerezoso } from '../../componentes/tres/FondoShader'
import { HeroInterno } from '../../componentes/comunes/HeroInterno/HeroInterno'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { FilaServicio } from '../../componentes/comunes/FilaServicio/FilaServicio'
import { Boton } from '../../componentes/comunes/Boton/Boton'
import { areasDePractica } from '../../datos/areasDePractica'
import './Servicios.scss'

export function Servicios() {
  return (
    <>
      <Head>
        <title>Servicios y Especialidades — OREKA Consorcio Jurídico</title>
        <meta
          name="description"
          content="Áreas de práctica de OREKA Consorcio Jurídico: fiscal, administrativo, corporativo, laboral, mercantil, civil y familiar."
        />
      </Head>

      <HeroInterno
        epigrafe="Servicios"
        titulo="Especialidades legales para cada etapa de tu empresa"
        descripcion="Un consorcio, todas las materias. Coordinamos internamente para que tengas una sola estrategia legal, sin importar cuántas áreas involucre tu caso."
        fondo={<ClienteSolo Componente={FondoShaderPerezoso} respaldo={<FondoEstatico variante="shader" />} />}
      />

      <Seccion tono="clara">
        <div className="servicios__lista">
          {areasDePractica.map((area, indice) => (
            <FilaServicio key={area.id} area={area} invertida={indice % 2 === 1} />
          ))}
        </div>
      </Seccion>

      <Seccion tono="oscura" className="servicios__cta">
        <h2 className="u-titulo-seccion">¿No estás seguro de qué área necesitás?</h2>
        <p className="u-parrafo-guia u-parrafo-guia--invertido">
          Contanos tu situación en una consulta inicial y te orientamos hacia la estrategia correcta.
        </p>
        <Boton to="/contacto" variante="primario">
          Agenda una Consulta
        </Boton>
      </Seccion>
    </>
  )
}

export default Servicios
export { Servicios as Component }
