/**
 * PricingModal Component
 * High-converting pricing comparison modal showing Free vs Pro plans
 */
function PricingModal({ show, handleClose }) {
  if (!show) return null;

  const handlePremiumClick = () => {
    // Show success message
    alert('¡Bienvenido a EduConnect Pro! 🎉\n\nGracias por unirte a nuestra comunidad premium. En un proyecto real, aquí procesaríamos el pago.');
    handleClose();
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <h4 className="modal-title mb-2">
                  <i className="bi bi-stars me-2"></i>
                  Elige el plan perfecto para tu carrera
                </h4>
                <p className="mb-0 small" style={{ opacity: 0.95 }}>
                  Invierte en tu futuro por menos de lo que cuesta un menú
                </p>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                aria-label="Cerrar"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4">
              <div className="row g-4">
                {/* FREE PLAN - Left Card */}
                <div className="col-md-6">
                  <div className="card pricing-card h-100 border">
                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h5 className="fw-bold mb-3">Estudiante</h5>
                        <div className="display-4 fw-bold text-muted mb-2">
                          S/. 0
                          <small className="fs-6 fw-normal text-muted"> / mes</small>
                        </div>
                        <p className="text-muted small">Para comenzar tu camino</p>
                      </div>

                      <hr className="my-4" />

                      {/* Features List */}
                      <ul className="list-unstyled mb-4">
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle text-secondary me-2 mt-1"></i>
                          <span>Acceso a foros</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle text-secondary me-2 mt-1"></i>
                          <span>Búsqueda de tutores</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle text-secondary me-2 mt-1"></i>
                          <span>3 descargas diarias</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start text-muted">
                          <i className="bi bi-x-circle text-muted me-2 mt-1"></i>
                          <span>Descargas ilimitadas</span>
                        </li>
                        <li className="mb-3 d-flex align-items-start text-muted">
                          <i className="bi bi-x-circle text-muted me-2 mt-1"></i>
                          <span>Sin anuncios</span>
                        </li>
                      </ul>

                      <button 
                        className="btn btn-outline-secondary w-100" 
                        disabled
                      >
                        Plan Actual
                      </button>
                    </div>
                  </div>
                </div>

                {/* PRO PLAN - Right Card (Hero) */}
                <div className="col-md-6">
                  <div className="card pricing-card pro h-100 border-warning shadow-lg position-relative">
                    {/* Best Value Badge */}
                    <div className="best-value-badge">
                      <span className="badge bg-warning text-dark">
                        <i className="bi bi-star-fill me-1"></i>
                        Más Popular
                      </span>
                    </div>

                    <div className="card-body p-4">
                      <div className="text-center mb-4">
                        <h5 className="fw-bold mb-3 text-warning">
                          <i className="bi bi-gem me-2"></i>
                          Universitario PRO
                        </h5>
                        <div className="display-4 fw-bold text-warning mb-2">
                          S/. 9.90
                          <small className="fs-6 fw-normal text-muted"> / mes</small>
                        </div>
                        <p className="text-muted small">Todo lo que necesitas para triunfar</p>
                      </div>

                      <hr className="my-4" />

                      {/* Features List */}
                      <ul className="list-unstyled mb-4">
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span><strong>Descargas Ilimitadas</strong></span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span><strong>Insignia de Verificado</strong></span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span><strong>Sin Anuncios</strong></span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span><strong>Acceso a Grabaciones</strong></span>
                        </li>
                        <li className="mb-3 d-flex align-items-start">
                          <i className="bi bi-check-circle-fill text-success me-2 mt-1"></i>
                          <span><strong>Soporte Prioritario</strong></span>
                        </li>
                      </ul>

                      <button 
                        className="btn btn-warning w-100 fw-bold text-dark"
                        onClick={handlePremiumClick}
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          border: 'none',
                          padding: '12px',
                          fontSize: '1.1rem'
                        }}
                      >
                        <i className="bi bi-lightning-charge-fill me-2"></i>
                        Obtener Premium
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="text-center mt-4 pt-4 border-top">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-2"></i>
                  Cancela cuando quieras • Sin compromisos • Pago seguro
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PricingModal;
