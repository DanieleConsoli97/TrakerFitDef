import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { ThemeProvider } from './provider/ThemeProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './contexts/GlobalContext.jsx'
import DocumentTitleUpdater from './provider/DocumentTitleUpdate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <ThemeProvider>
        <BrowserRouter>
          <GlobalContextProvider>
            <DocumentTitleUpdater />
            <App />
          </GlobalContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HeroUIProvider>
  </StrictMode>,
)
