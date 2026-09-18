import { Head } from "vite-react-ssg";
import { ClienteSolo } from "../../componentes/tres/ClienteSolo";
import { FondoEstatico } from "../../componentes/tres/FondoEstatico";
import { ListonesDoradosPerezoso } from "../../componentes/tres/ListonesDorados";
import { HeroInterno } from "../../componentes/comunes/HeroInterno/HeroInterno";
import { Seccion } from "../../componentes/comunes/Seccion/Seccion";
import { FilaServicio } from "../../componentes/comunes/FilaServicio/FilaServicio";
import { Boton } from "../../componentes/comunes/Boton/Boton";
import { areasDePractica } from "../../datos/areasDePractica";
import "./Servicios.scss";

export function Servicios() {
  const gruposDePractica = [
    areasDePractica.slice(0, 3),
    areasDePractica.slice(3, 7),
  ];

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
        fondo={
          <ClienteSolo
            Componente={ListonesDoradosPerezoso}
            respaldo={<FondoEstatico variante="listones" />}
          />
        }
      />

      {gruposDePractica.map((grupo, indice) => {
        const tono = indice % 2 === 0 ? "oscura" : "blanco";

        return (
          <Seccion key={indice} tono={tono}>
            <div className="servicios__lista">
              {grupo.map((area, indice) => (
                <FilaServicio
                  key={area.id}
                  area={area}
                  invertida={indice % 2 === 1}
                  relieve={tono === "oscura"}
                  imagen={area.imagen}
                />
              ))}
            </div>
          </Seccion>
        );
      })}

      <Seccion tono="oscura" className="servicios__cta">
        <h2 className="u-titulo-seccion">
          ¿No estás seguro de qué área necesitás?
        </h2>
        <p className="u-parrafo-guia">
          Cuéntanos tu situación en una consulta inicial y te orientamos hacia la
          estrategia correcta.
        </p>
        <Boton to="/contacto" variante="terciario">
          Agenda una Consulta
        </Boton>
      </Seccion>
    </>
  );
}

export default Servicios;
export { Servicios as Component };
