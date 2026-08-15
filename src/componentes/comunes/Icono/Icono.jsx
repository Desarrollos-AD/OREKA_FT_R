import './Icono.scss'

// Set mínimo de íconos de línea propios (sin depender de una librería de
// íconos externa) para las áreas de práctica, los datos de contacto y las
// redes sociales. Trazo consistente de 1.6px, viewBox 24x24.
const TRAZOS = {
  balanza: (
    <>
      <path d="M12 3v18M7 21h10M5 7h14M5 7l-3 6a3.5 3.5 0 0 0 6 0L5 7Zm14 0l-3 6a3.5 3.5 0 0 0 6 0l-3-6Z" />
    </>
  ),
  maletin: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  documento: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  familia: (
    <>
      <circle cx="8" cy="7" r="2.4" />
      <circle cx="16" cy="7" r="2.4" />
      <path d="M3.5 20v-2a4 4 0 0 1 4-4h1a4 4 0 0 1 3 1.35M15.5 15.35A4 4 0 0 1 18.5 14h1a4 4 0 0 1 4 4v2" />
    </>
  ),
  edificio: (
    <>
      <path d="M5 21V6l7-3 7 3v15" />
      <path d="M3 21h18M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 21v-4h6v4" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  grafico: (
    <>
      <path d="M4 20V10M11 20V4M18 20v-7" />
      <path d="M3 20h18" />
    </>
  ),
  martillo: (
    <>
      <path d="m14.5 6.5 3 3M2 22l7.5-7.5M12.5 4.5l7 7-2 2-7-7 2-2Z" />
      <path d="m11 6 2-2 5 5-2 2" />
    </>
  ),
  telefono: (
    <path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.4c1 .3 2 .5 3.1.5a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 1-1.5 1.5C10.6 21.5 2.5 13.4 2.5 3.5A1.5 1.5 0 0 1 4 2h3.2a1.5 1.5 0 0 1 1.5 1.5c0 1.1.2 2.1.5 3.1.15.55 0 1.1-.4 1.5L6.6 10.8Z" />
  ),
  email: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  flecha: <path d="M5 12h13M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cerrar: <path d="m5 5 14 14M19 5 5 19" />,
  facebook: (
    <path d="M14 9h2.5V6H14c-1.8 0-3 1.3-3 3.2V11H9v3h2v7h3v-7h2.3l.4-3H14V9.5c0-.4.2-.5.6-.5Z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
}

export function Icono({ nombre, tamano = 24, className = '', ...resto }) {
  const trazo = TRAZOS[nombre]
  if (!trazo) return null

  return (
    <svg
      className={`icono ${className}`.trim()}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...resto}
    >
      {trazo}
    </svg>
  )
}
