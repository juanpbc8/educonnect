import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/Studio.css';
import ReactGA from 'react-ga4';

// Initialize Google Analytics 4
ReactGA.initialize('G-35VYNYG0GG'); // Replace with your actual Measurement ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
