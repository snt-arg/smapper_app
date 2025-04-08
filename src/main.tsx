import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeProvider } from './components/ui/color-mode.tsx';
import createSystem from '@/theme.ts';

const renderApp = (isProduction: boolean) => {
  const AppComponent = (
    <ChakraProvider value={createSystem}>
      <ColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>
  );

  if (isProduction) {
    return createRoot(document.getElementById('root')!).render(AppComponent);
  } else {
    return createRoot(document.getElementById('root')!).render(
      <StrictMode>{AppComponent}</StrictMode>
    );
  }
};

renderApp(import.meta.env.PROD);

