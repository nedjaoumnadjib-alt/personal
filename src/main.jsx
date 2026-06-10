import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const gmailComposeUrl =
  'https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=nedjaoumnadjib@gmail.com'

// eslint-disable-next-line react-refresh/only-export-components
function Contact() {
  return (
    <div>
      <h2>Contact Me</h2>
      <button onClick={() => window.open(gmailComposeUrl, '_blank')}>
        Send Email
      </button>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Contact />
  </StrictMode>,
)
