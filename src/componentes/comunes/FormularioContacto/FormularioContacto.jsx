import { useState } from 'react'
import { areasDePractica } from '../../../datos/areasDePractica'
import { Boton } from '../Boton/Boton'
import './FormularioContacto.scss'

const VALOR_INICIAL = { nombre: '', email: '', telefono: '', area: '', mensaje: '' }
const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar(valores) {
  const errores = {}
  if (!valores.nombre.trim()) errores.nombre = 'Contanos tu nombre.'
  if (!valores.email.trim()) {
    errores.email = 'Necesitamos un email de contacto.'
  } else if (!PATRON_EMAIL.test(valores.email)) {
    errores.email = 'Revisá el formato del email.'
  }
  if (!valores.mensaje.trim() || valores.mensaje.trim().length < 10) {
    errores.mensaje = 'Contanos brevemente tu caso (mínimo 10 caracteres).'
  }
  return errores
}

export function FormularioContacto() {
  const [valores, setValores] = useState(VALOR_INICIAL)
  const [errores, setErrores] = useState({})
  const [estado, setEstado] = useState('inactivo') // inactivo | validado

  const actualizarCampo = (campo) => (evento) => {
    setValores((previos) => ({ ...previos, [campo]: evento.target.value }))
  }

  const alEnviar = (evento) => {
    evento.preventDefault()
    const erroresEncontrados = validar(valores)
    setErrores(erroresEncontrados)

    if (Object.keys(erroresEncontrados).length > 0) {
      setEstado('inactivo')
      return
    }

    // TODO: conectar a un servicio real de envío (backend propio, Formspree,
    // EmailJS, etc.). Por ahora solo se valida en el cliente y se deja
    // constancia en consola — no se simula un envío exitoso.
    console.info('[FormularioContacto] Formulario válido, pendiente de conectar backend:', valores)
    setEstado('validado')
  }

  return (
    <form className="formulario-contacto" onSubmit={alEnviar} noValidate>
      <div className="formulario-contacto__fila">
        <div className="formulario-contacto__campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            value={valores.nombre}
            onChange={actualizarCampo('nombre')}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          />
          {errores.nombre && (
            <span className="formulario-contacto__error" id="error-nombre">
              {errores.nombre}
            </span>
          )}
        </div>

        <div className="formulario-contacto__campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={valores.email}
            onChange={actualizarCampo('email')}
            aria-invalid={Boolean(errores.email)}
            aria-describedby={errores.email ? 'error-email' : undefined}
          />
          {errores.email && (
            <span className="formulario-contacto__error" id="error-email">
              {errores.email}
            </span>
          )}
        </div>
      </div>

      <div className="formulario-contacto__fila">
        <div className="formulario-contacto__campo">
          <label htmlFor="telefono">Teléfono (opcional)</label>
          <input id="telefono" type="tel" value={valores.telefono} onChange={actualizarCampo('telefono')} />
        </div>

        <div className="formulario-contacto__campo">
          <label htmlFor="area">Área de interés</label>
          <select id="area" value={valores.area} onChange={actualizarCampo('area')}>
            <option value="">Seleccioná una materia</option>
            {areasDePractica.map((area) => (
              <option key={area.id} value={area.id}>
                {area.titulo}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="formulario-contacto__campo">
        <label htmlFor="mensaje">Contanos tu caso</label>
        <textarea
          id="mensaje"
          rows={5}
          value={valores.mensaje}
          onChange={actualizarCampo('mensaje')}
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
        />
        {errores.mensaje && (
          <span className="formulario-contacto__error" id="error-mensaje">
            {errores.mensaje}
          </span>
        )}
      </div>

      <Boton tipo="submit" variante="primario">
        Enviar mensaje
      </Boton>

      {estado === 'validado' && (
        <p className="formulario-contacto__aviso" role="status">
          Datos válidos. Este formulario todavía no está conectado a un servicio de envío real
          (queda como próximo paso técnico) — por ahora el mensaje no llega a nadie.
        </p>
      )}
    </form>
  )
}
