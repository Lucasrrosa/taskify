import RouteConfig from '@/config/routes/RouteConfig'
import '@/index.css'
import { GlobalStyles } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <RouteConfig />
    </StyledEngineProvider>
  </StrictMode>,
)
