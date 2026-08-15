import { Outlet } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { Encabezado } from '../componentes/comunes/Encabezado/Encabezado'
import { PieDePagina } from '../componentes/comunes/PieDePagina/PieDePagina'
import { useDesplazamientoSuave } from '../ganchos/useDesplazamientoSuave'
import '../estilos/base.scss'

/**
 * Layout raíz: encabezado + contenido de la ruta activa + pie de página,
 * más el desplazamiento suave (Lenis + GSAP) inicializado una única vez
 * para toda la sesión. El <Head> acá define los metadatos por defecto —
 * cada página los sobreescribe con los suyos (el elemento más interno gana).
 */
export function DisenioBase() {
  useDesplazamientoSuave()

  return (
    <>
      <Head>
        <html lang="es" />
        <title>OREKA Consorcio Jurídico</title>
        <meta
          name="description"
          content="OREKA Consorcio Jurídico: asesoría legal en derecho mercantil, laboral, civil y familiar para empresas y particulares."
        />
      </Head>

      <Encabezado />
      <main>
        <Outlet />
      </main>
      <PieDePagina />
    </>
  )
}

export default DisenioBase
export { DisenioBase as Component }
