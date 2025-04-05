import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
// Import Tailwind first, followed by your custom CSS
import './tailwind.css'
import './index.css'
import './fixes.css'
import App from './App.jsx'

// Create root once and store it
const root = createRoot(document.getElementById('root'))

// Render app with StrictMode to catch potential issues
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
