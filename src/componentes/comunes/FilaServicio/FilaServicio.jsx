import { Icono } from "../Icono/Icono";
import "./FilaServicio.scss";

/**
 * Fila de una especialidad en la página de Servicios: ícono + título
 * subrayado + los párrafos reales de la descripción, alternando de lado con
 * un panel visual en cada fila impar/par. Sin foto real todavía: el panel usa un degradé de marca + el
 * ícono del área en grande, en vez de una foto de stock inventada.
 */
export function FilaServicio({ area, invertida = false, relieve, imagen }) {
  return (
    <div className="">
      <article
        id={area.id}
        className={`fila-servicio ${invertida ? "fila-servicio--invertida" : ""}`}
      >
        <div className="fila-servicio__texto">
          <div className="fila-servicio__cabecera">
            <span className="fila-servicio__icono">
              <img src={area.icono} alt="" />
            </span>
            <h3 className="fila-servicio__titulo">{area.titulo}</h3>
          </div>

          {area.parrafos.map((parrafo, indice) => (
            <p className="fila-servicio__parrafo" key={indice}>
              {parrafo}
            </p>
          ))}
        </div>

        <div className="fila-servicio__panel">
          <div className="fila-servicio__panel__contenedor">
            <img src={imagen} alt="" />
            <div
              className={`sombra__img ${invertida ? "sombra__img--izq" : "sombra__img--drch"}`}
              style={{
                backgroundImage: relieve
                  ? "url('/relieve_blanco.svg')"
                  : "url('/relieve_naranga.svg')",
              }}
            ></div>
          </div>
        </div>
      </article>
    </div>
  );
}
