import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

<<<<<<< HEAD
// Global error handlers to avoid a single runtime error breaking the entire UI in production.
// These will log errors to the console and keep the app mounted so the admin dashboard can still load data.
window.addEventListener('error', (ev) => {
  // prevent the default browser error overlay from stopping execution
  try {
     
    console.error('Global error caught:', ev.error || ev.message || ev);
  } catch { void 0; }
});
window.addEventListener('unhandledrejection', (ev) => {
  try {
     
    console.error('Unhandled promise rejection:', ev.reason || ev);
  } catch { void 0; }
});

=======
>>>>>>> 25d02c8f81b643efa141f93f6bf1a88964e0f823
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
