import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import { defaultSystem } from "@chakra-ui/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ChakraProvider value={defaultSystem}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </ThemeProvider>
  </StrictMode>,
)
