import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PricingModal from '../ui/PricingModal';

function Navbar({ onShowAuthModal, onShowUploadModal }) {
  const location = useLocation();
  const [showPricing, setShowPricing] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-journal-bookmark-fill me-2"></i>
            EduConnect
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/recursos' ? 'active' : ''}`} to="/recursos">Recursos</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/tutorias' ? 'active' : ''}`} to="/tutorias">Tutorías</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/foro' ? 'active' : ''}`} to="/foro">Foro</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              <button 
                className="btn btn-outline-warning me-2" 
                style={{ fontWeight: '600', borderWidth: '2px' }}
                onClick={() => setShowPricing(true)}
              >
                <i className="bi bi-gem me-1"></i> Hazte Pro
              </button>
              <button 
                className="btn btn-outline-primary me-2" 
                onClick={onShowUploadModal}
              >
                <i className="bi bi-cloud-upload me-1"></i> Subir
              </button>
              <button 
                className="btn btn-primary" 
                onClick={onShowAuthModal}
              >
                <i className="bi bi-person-circle me-1"></i> Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Modal */}
      <PricingModal 
        show={showPricing} 
        handleClose={() => setShowPricing(false)} 
      />
    </>
  );
}

export default Navbar;
