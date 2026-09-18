import { ViteReactSSG } from 'vite-react-ssg'
import { AppRouter } from "./app/AppRouter";
import './styles/fuentes'

export const createRoot = ViteReactSSG({ routes: AppRouter, basename: import.meta.env.BASE_URL })
