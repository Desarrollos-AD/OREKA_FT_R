import { Suspense } from 'react'
import { ClientOnly } from 'vite-react-ssg'
import { puedeUsarEscenasPremium, esViewportAngosto } from '../../utilidades/movimiento'

/**
 * Envuelve cualquier escena Three.js/R3F para que:
 *  1) nunca se ejecute durante el prerender SSG (window/WebGL no existen en Node),
 *  2) solo se cargue (y descargue su chunk) si el navegador soporta WebGL y el
 *     usuario no pidió reducir movimiento (y, si `soloEscritorio`, tampoco en
 *     viewports angostos),
 *  3) siempre haya un `respaldo` visual (degradé CSS) mientras se decide o
 *     mientras se descarga el chunk — nunca un hueco en blanco.
 *
 * Importante: la decisión de mostrar o no la escena se toma siempre dentro
 * de un efecto client-only (nunca comparando `window` durante el render), así
 * el árbol que ve React es idéntico en servidor/prerender y en el primer
 * render del cliente — evita mismatches de hidratación.
 *
 * `Componente` debe ser un componente ya envuelto en `React.lazy(() => import(...))`
 * definido a nivel de módulo por quien lo use (para no recrearlo en cada render).
 */
export function ClienteSolo({ Componente, respaldo = null, soloEscritorio = false, ...props }) {
  return (
    <ClientOnly>
      {() => (
        <ContenidoCliente Componente={Componente} respaldo={respaldo} soloEscritorio={soloEscritorio} props={props} />
      )}
    </ClientOnly>
  )
}

function ContenidoCliente({ Componente, respaldo, soloEscritorio, props }) {
  // <ClientOnly> ya garantiza que esta función solo se invoca en el
  // cliente, después del montaje — no hace falta useState/useEffect para
  // leer capacidades del navegador, se puede evaluar directo en el render.
  const habilitado = puedeUsarEscenasPremium() && !(soloEscritorio && esViewportAngosto())

  if (!habilitado) return respaldo

  return (
    <Suspense fallback={respaldo}>
      <Componente {...props} />
    </Suspense>
  )
}
