import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { FondoShaderPerezoso } from '../../componentes/tres/FondoShader'
import { HeroInterno } from '../../componentes/comunes/HeroInterno/HeroInterno'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { FormularioContacto } from '../../componentes/comunes/FormularioContacto/FormularioContacto'
import { Icono } from '../../componentes/comunes/Icono/Icono'
import { datosDeContacto } from '../../datos/datosDeContacto'
import './Contacto.scss'

const { latitud, longitud } = datosDeContacto.mapa
const DELTA = 0.01
const URL_MAPA = `https://www.openstreetmap.org/export/embed.html?bbox=${longitud - DELTA}%2C${
  latitud - DELTA
}%2C${longitud + DELTA}%2C${latitud + DELTA}&layer=mapnik&marker=${latitud}%2C${longitud}`

const TARJETAS = [
  { icono: 'ubicacion', titulo: 'Ubicación', valor: datosDeContacto.direccion },
  { icono: 'telefono', titulo: 'Teléfono', valor: datosDeContacto.telefono },
  { icono: 'reloj', titulo: 'Horario', valor: datosDeContacto.horario },
]

export function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto — OREKA Consorcio Jurídico</title>
        <meta name="description" content="Agendá una consulta con OREKA Consorcio Jurídico." />
      </Head>

      <HeroInterno
        epigrafe="Contacto"
        titulo="Hablemos de tu caso"
        descripcion="Completá el formulario o escribinos directamente — te respondemos a la brevedad."
        fondo={<ClienteSolo Componente={FondoShaderPerezoso} respaldo={<FondoEstatico variante="shader" />} />}
      />

      <Seccion tono="clara">
        <div className="contacto__tarjetas">
          {TARJETAS.map((tarjeta) => (
            <div className="tarjeta-contacto" key={tarjeta.titulo}>
              <span className="tarjeta-contacto__icono">
                <Icono nombre={tarjeta.icono} tamano={24} />
              </span>
              <h3 className="tarjeta-contacto__titulo">{tarjeta.titulo}</h3>
              <p className="tarjeta-contacto__valor">{tarjeta.valor}</p>
            </div>
          ))}
        </div>

        <div className="contacto__cuerpo">
          <FormularioContacto />
          <div className="contacto__mapa">
            <iframe
              title="Ubicación de OREKA Consorcio Jurídico"
              src={URL_MAPA}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Seccion>
    </>
  )
}

export default Contacto
export { Contacto as Component }
