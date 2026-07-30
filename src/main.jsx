import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EmailProvider } from './context/EmailContext.jsx'

createRoot(document.getElementById('root')).render(
    
  
  <BrowserRouter>
<EmailProvider>
  
    <App />
</EmailProvider>
  
  </BrowserRouter>,
)
