import RouteConfig from '@/config/routes/RouteConfig'
import '@/index.css'
import { GlobalStyles } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider enableCssLayer>
        <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
        <RouteConfig />
      </StyledEngineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
