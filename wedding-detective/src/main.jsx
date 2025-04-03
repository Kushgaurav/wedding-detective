import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create root once and store it
const root = createRoot(document.getElementById('root'))

// Render app with a clean approach (no StrictMode for production)
root.render(<App />)
