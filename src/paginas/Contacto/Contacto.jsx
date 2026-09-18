import { Head } from 'vite-react-ssg'
import { ClienteSolo } from '../../componentes/tres/ClienteSolo'
import { FondoEstatico } from '../../componentes/tres/FondoEstatico'
import { ListonesDoradosPerezoso } from '../../componentes/tres/ListonesDorados'
import { HeroInterno } from '../../componentes/comunes/HeroInterno/HeroInterno'
import { Seccion } from '../../componentes/comunes/Seccion/Seccion'
import { FormularioContacto } from '../../componentes/comunes/FormularioContacto/FormularioContacto'
import { Icono } from '../../componentes/comunes/Icono/Icono'
import { datosDeContacto } from '../../datos/datosDeContacto'
import './Contacto.scss'

const TARJETAS = [
  { icono: 'ubicacion', titulo: 'Ubicación', valor: datosDeContacto.direccion },
  { icono: 'telefono', titulo: 'Teléfono', valor: datosDeContacto.telefono },
  { icono: 'reloj', titulo: 'Horario', valor: datosDeContacto.horario },
]

const PUNTOS_CONFIANZA = [
  {
    icono: 'escudo',
    titulo: 'Confidencialidad total',
    texto: 'Tu información y la de tu empresa se tratan bajo estricta reserva profesional.',
  },
  {
    icono: 'reloj',
    titulo: 'Respuesta en menos de 24 h',
    texto: 'Un abogado del equipo revisa tu mensaje y te contacta el mismo día hábil.',
  },
  {
    icono: 'balanza',
    titulo: 'Asesoría experta',
    texto: 'Más de 15 años de experiencia en materia fiscal, corporativa y de cumplimiento.',
  },
  {
    icono: 'maletin',
    titulo: 'Seguimiento personalizado',
    texto: 'Un solo punto de contacto acompaña tu caso de principio a fin, sin trámites perdidos.',
  },
]

export function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto — OREKA Consorcio Jurídico</title>
        <meta
          name="description"
          content="Agendá una consulta con OREKA Consorcio Jurídico."
        />
      </Head>

      <HeroInterno
        epigrafe="Contacto"
        titulo="Hablemos de tu caso"
        descripcion="Completá el formulario o escribinos directamente — te respondemos a la brevedad."
        fondo={
          <ClienteSolo
            Componente={ListonesDoradosPerezoso}
            respaldo={<FondoEstatico variante="listones" />}
          />
        }
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

          <div className="contacto__confianza">
            <h3 className="contacto__confianza-titulo u-titulo-tarjeta">
              ¿Por qué escribirnos hoy?
            </h3>
            <p className="contacto__confianza-texto">
              Cada mensaje se atiende con la misma seriedad que un caso en
              curso: revisamos tu contexto legal y te respondemos con algo
              concreto.
            </p>

            <ul className="contacto__confianza-lista">
              {PUNTOS_CONFIANZA.map((punto) => (
                <li className="confianza-punto" key={punto.titulo}>
                  <span className="confianza-punto__icono">
                    <Icono nombre={punto.icono} tamano={20} />
                  </span>
                  <div className="confianza-punto__texto">
                    <strong>{punto.titulo}</strong>
                    <p>{punto.texto}</p>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </Seccion>
      
        <div className="contacto__mapa">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4897.852936145179!2d-96.10659998823715!3d19.147570881997076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c34175b7aaadd5%3A0xe63dd221938be52d!2sOreka%20Consorcio%20Jur%C3%ADdico!5e1!3m2!1ses-419!2smx!4v1786988153623!5m2!1ses-419!2smx"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
    </>
  );
}

export default Contacto
export { Contacto as Component }
