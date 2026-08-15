import { DisenioBase } from './DisenioBase'

/**
 * Árbol de rutas para vite-react-ssg. Cada página se carga con `lazy` para
 * que su chunk (y el de Three.js que arrastre) no se descargue en rutas que
 * no lo necesitan. El layout raíz no es lazy porque siempre se necesita;
 * `entry` le indica al build dónde está su fuente para resolver bien el CSS.
 */
export const AppRouter = [
  {
    path: '/',
    element: <DisenioBase />,
    entry: 'src/app/DisenioBase.jsx',
    children: [
      { index: true, lazy: () => import('../paginas/Inicio/Inicio.jsx') },
      { path: 'sobre-la-firma', lazy: () => import('../paginas/SobreLaFirma/SobreLaFirma.jsx') },
      { path: 'abogados', lazy: () => import('../paginas/Abogados/Abogados.jsx') },
      { path: 'servicios', lazy: () => import('../paginas/Servicios/Servicios.jsx') },
      { path: 'contacto', lazy: () => import('../paginas/Contacto/Contacto.jsx') },
    ],
  },
]
