import { ClienteSolo } from '../../tres/ClienteSolo'
import { MedallonAbogadoPerezoso } from '../../tres/MedallonAbogado'
import { Boton } from '../Boton/Boton'
import './FilaAbogado.scss'

/**
 * Fila de un abogado en filas alternadas (mismo patrón que las
 * especialidades en Servicios) — no una grilla de tarjetas. Sin foto real
 * disponible: el panel muestra una gema 3D dorada (gira y reacciona al
 * mouse) con las iniciales, en vez de una fotografía inventada.
 */
export function FilaAbogado({ abogado, invertida = false }) {
  return (
    <article className={`fila-abogado ${invertida ? 'fila-abogado--invertida' : ''}`}>
      <div className="fila-abogado__panel">
        <ClienteSolo Componente={MedallonAbogadoPerezoso} respaldo={null} />
        <span className="fila-abogado__iniciales" aria-hidden="true">
          {abogado.iniciales}
        </span>
      </div>

      <div className="fila-abogado__texto">
        <h3 className="fila-abogado__nombre">
          {abogado.titulo} {abogado.nombre}
        </h3>
        <span className="fila-abogado__rol">{abogado.rol}</span>
        <p className="fila-abogado__resumen">{abogado.resumen}</p>
        <p className="fila-abogado__materias">{abogado.materias}</p>
        <Boton to="/contacto" variante="enlace" invertido>
          Agenda una consulta
        </Boton>
      </div>
    </article>
  )
}
