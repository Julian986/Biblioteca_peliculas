import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { InventarioProvider } from './context/InventarioContext.tsx'
import { CategoriaProvider } from './context/CategoriaContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventarioProvider>
    <CategoriaProvider>
      <App />
    </CategoriaProvider>
    </InventarioProvider>
  </StrictMode>,
)

