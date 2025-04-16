import { StrictMode, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from '@/shared/components/ui/color-mode'
import { Toaster } from '@/shared/components/ui/toaster'

import AppLayout from '@/layouts/AppLayout'
import createSystem from '@/theme.ts'

// Lazy import pages
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ServicesPage = lazy(() => import('@/pages/ServicesPage'))
const VisualizerPage = lazy(() => import('@/pages/VisualizerPage'))
const RecordingsPage = lazy(() => import('@/pages/RecordingsPage'))
// const SensorsPage = lazy(() => import('@/pages/SensorsPage'))

const renderApp = (isProduction: boolean) => {
  const AppComponent = (
    <ChakraProvider value={createSystem}>
      <ColorModeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/visualizer" element={<VisualizerPage />} />
              <Route path="/recordings" element={<RecordingsPage />} />
              {/*<Route path="/sensors" element={<SensorsPage />} />*/}
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  )

  if (isProduction) {
    return createRoot(document.getElementById('root')!).render(AppComponent)
  } else {
    return createRoot(document.getElementById('root')!).render(
      <StrictMode>{AppComponent}</StrictMode>
    )
  }
}

renderApp(import.meta.env.PROD)
