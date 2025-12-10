import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PricingModal from '../ui/PricingModal';
import ThemeToggle from './ThemeToggle';

function Navbar({ onShowAuthModal, onShowUploadModal }) {
  const location = useLocation();
  const [showPricing, setShowPricing] = useState(false);
  
  // Notification Center State
  const [unreadCount, setUnreadCount] = useState(3);
  const [notifications] = useState([
    { 
      id: 1, 
      text: "Juan Pérez respondió a tu pregunta en Cálculo I", 
      time: "Hace 5 min", 
      icon: "bi-chat-left-text-fill", 
      color: "text-primary" 
    },
    { 
      id: 2, 
      text: "Nuevo material disponible en Física II", 
      time: "Hace 2 horas", 
      icon: "bi-file-earmark-pdf-fill", 
      color: "text-danger" 
    },
    { 
      id: 3, 
      text: "Tu solicitud de tutoría fue Aceptada", 
      time: "Hace 1 día", 
      icon: "bi-check-circle-fill", 
      color: "text-success" 
    }
  ]); // In real app, this would be managed by a notification service/API

  // Mark all notifications as read
  const handleMarkAsRead = () => {
    setUnreadCount(0);
  };

  // Handle notification click (simulate navigation)
  const handleNotificationClick = (notificationId) => {
    console.log(`Navegando a notificación ${notificationId}`);
    // In a real app, this would navigate to the relevant page
    // For now, we just close the dropdown (handled by Bootstrap)
  };

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
            <div className="d-flex align-items-center gap-2">
              <button 
                className="btn btn-outline-warning" 
                style={{ fontWeight: '600', borderWidth: '2px' }}
                onClick={() => setShowPricing(true)}
              >
                <i className="bi bi-gem me-1"></i> Hazte Pro
              </button>
              <button 
                className="btn btn-outline-primary" 
                onClick={onShowUploadModal}
              >
                <i className="bi bi-cloud-upload me-1"></i> Subir
              </button>

              {/* Notification Center */}
              <div className="dropdown">
                <button
                  className="btn btn-light position-relative"
                  type="button"
                  id="notificationDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ 
                    border: '1px solid #dee2e6',
                    borderRadius: '8px'
                  }}
                >
                  <i className="bi bi-bell fs-5"></i>
                  {unreadCount > 0 && (
                    <span 
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: '0.65rem', padding: '0.25em 0.5em' }}
                    >
                      {unreadCount}
                      <span className="visually-hidden">notificaciones no leídas</span>
                    </span>
                  )}
                </button>

                <ul 
                  className="dropdown-menu dropdown-menu-end shadow-lg" 
                  aria-labelledby="notificationDropdown"
                  style={{ 
                    width: '380px',
                    maxHeight: '500px',
                    overflowY: 'auto',
                    borderRadius: '12px',
                    border: 'none'
                  }}
                >
                  {/* Header */}
                  <li className="px-3 py-3 border-bottom">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 fw-bold">
                        <i className="bi bi-bell-fill me-2 text-primary"></i>
                        Notificaciones
                      </h6>
                      {unreadCount > 0 && (
                        <button
                          className="btn btn-link btn-sm text-decoration-none p-0"
                          onClick={handleMarkAsRead}
                          style={{ fontSize: '0.85rem' }}
                        >
                          Marcar como leídas
                        </button>
                      )}
                    </div>
                  </li>

                  {/* Notifications List */}
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li key={notification.id}>
                        <button
                          className="dropdown-item py-3 px-3"
                          onClick={() => handleNotificationClick(notification.id)}
                          style={{ 
                            whiteSpace: 'normal',
                            borderBottom: '1px solid #f0f0f0'
                          }}
                        >
                          <div className="d-flex align-items-start">
                            <div 
                              className="flex-shrink-0 me-3"
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                backgroundColor: '#f8f9fa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <i className={`${notification.icon} ${notification.color} fs-5`}></i>
                            </div>
                            <div className="flex-grow-1">
                              <p className="mb-1 fw-medium" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                                {notification.text}
                              </p>
                              <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                                <i className="bi bi-clock me-1"></i>
                                {notification.time}
                              </small>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-4 text-center">
                      <div className="text-muted">
                        <i className="bi bi-inbox fs-1 d-block mb-2" style={{ opacity: 0.3 }}></i>
                        <p className="mb-0">No tienes notificaciones nuevas</p>
                      </div>
                    </li>
                  )}

                  {/* Footer - View All */}
                  {notifications.length > 0 && (
                    <li className="border-top">
                      <a 
                        href="#" 
                        className="dropdown-item text-center py-3 fw-semibold text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('Ver todas las notificaciones');
                        }}
                      >
                        Ver todas las notificaciones
                        <i className="bi bi-arrow-right ms-2"></i>
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

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
