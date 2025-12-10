/**
 * ResourceDetailModal Component
 * Displays resource details with social proof (ratings & comments) before download
 */
function ResourceDetailModal({ show, handleClose, resource }) {
  if (!show || !resource) return null;

  // Simulated review data (in real app, this would come from API)
  const reviewsData = [
    { 
      id: 1,
      user: "Ana G.", 
      text: "¡Me salvó el parcial! Muy buen resumen.", 
      rating: 5,
      date: "Hace 2 días"
    },
    { 
      id: 2,
      user: "Carlos M.", 
      text: "Bien explicado, aunque le falta algunos ejemplos prácticos.", 
      rating: 4,
      date: "Hace 1 semana"
    },
    { 
      id: 3,
      user: "María P.", 
      text: "Excelente material, muy completo y actualizado.", 
      rating: 5,
      date: "Hace 2 semanas"
    }
  ];

  // Calculate average rating
  const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 >= 0.5;

  // Get appropriate icon based on resource type
  const getPreviewIcon = (tipo) => {
    switch (tipo) {
      case 'PDF':
        return 'bi-file-pdf';
      case 'Guía':
        return 'bi-book';
      case 'Apuntes':
        return 'bi-journal-text';
      case 'Ejercicios':
        return 'bi-pencil-square';
      case 'Presentación':
        return 'bi-easel';
      case 'Formulario':
        return 'bi-file-earmark-ruled';
      case 'Resumen':
        return 'bi-file-text';
      default:
        return 'bi-file-earmark-text';
    }
  };

  // Simulated metadata (in real app, would come from backend)
  const uploadDate = "15 Nov 2024";
  const authorName = resource.autor || resource.profesor || "Usuario EduConnect";

  const handleDownload = () => {
    alert(`Descargando: ${resource.titulo}\n\n¡En una aplicación real, aquí se iniciaría la descarga!`);
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
        <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-eye me-2"></i>
                Vista Previa del Recurso
              </h5>
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
                {/* LEFT COLUMN - Preview Placeholder */}
                <div className="col-md-5">
                  <div 
                    className="bg-light rounded d-flex flex-column align-items-center justify-content-center p-4"
                    style={{ minHeight: '400px', border: '2px dashed #dee2e6' }}
                  >
                    <i 
                      className={`bi ${getPreviewIcon(resource.tipo)} text-secondary mb-4`}
                      style={{ fontSize: '6rem', opacity: 0.4 }}
                    ></i>
                    <h5 className="text-muted text-center mb-2">Vista previa del documento</h5>
                    <p className="text-muted text-center small mb-4">
                      {resource.tipo} • {resource.titulo}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="w-100 mt-auto">
                      <div className="d-flex justify-content-around text-center pt-3 border-top">
                        <div>
                          <i className="bi bi-download text-primary fs-4"></i>
                          <div className="small text-muted mt-1">{resource.descargas}</div>
                          <div className="small fw-semibold">Descargas</div>
                        </div>
                        <div>
                          <i className="bi bi-hand-thumbs-up text-success fs-4"></i>
                          <div className="small text-muted mt-1">{resource.likes}</div>
                          <div className="small fw-semibold">Me gusta</div>
                        </div>
                        <div>
                          <i className="bi bi-star-fill text-warning fs-4"></i>
                          <div className="small text-muted mt-1">{resource.rating}%</div>
                          <div className="small fw-semibold">Calidad</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN - Details & Social Proof */}
                <div className="col-md-7">
                  {/* Title and Badges */}
                  <div className="mb-4">
                    <h4 className="fw-bold mb-3">{resource.titulo}</h4>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <span className="badge bg-primary">
                        <i className="bi bi-building me-1"></i>
                        {resource.universidadSigla}
                      </span>
                      {resource.carrera && (
                        <span className="badge bg-info">
                          <i className="bi bi-mortarboard me-1"></i>
                          {resource.carrera}
                        </span>
                      )}
                      {resource.materia && (
                        <span className="badge bg-success">
                          <i className="bi bi-book me-1"></i>
                          {resource.materia}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mb-4 p-3 bg-light rounded">
                    <p className="mb-2 small">
                      <i className="bi bi-person-circle me-2 text-primary"></i>
                      Subido por <strong>{authorName}</strong>
                    </p>
                    <p className="mb-0 small">
                      <i className="bi bi-calendar-check me-2 text-primary"></i>
                      {uploadDate}
                    </p>
                  </div>

                  {/* Description */}
                  {resource.descripcion && (
                    <div className="mb-4">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-text-paragraph me-2"></i>
                        Descripción
                      </h6>
                      <p className="text-muted">{resource.descripcion}</p>
                    </div>
                  )}

                  {/* Rating Section */}
                  <div className="mb-4 pb-4 border-bottom">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-star-fill text-warning me-2"></i>
                      Calificación
                    </h6>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-3">
                        {/* Render stars */}
                        {[...Array(fullStars)].map((_, i) => (
                          <i key={`full-${i}`} className="bi bi-star-fill text-warning fs-5"></i>
                        ))}
                        {hasHalfStar && (
                          <i className="bi bi-star-half text-warning fs-5"></i>
                        )}
                        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                          <i key={`empty-${i}`} className="bi bi-star text-warning fs-5"></i>
                        ))}
                      </div>
                      <div>
                        <strong className="fs-5 me-2">{averageRating.toFixed(1)}/5</strong>
                        <span className="text-muted small">
                          (basado en {reviewsData.length} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">
                      <i className="bi bi-chat-left-quote me-2"></i>
                      Comentarios de estudiantes
                    </h6>
                    <div className="comments-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {reviewsData.map((review) => (
                        <div key={review.id} className="card mb-3 border-0 bg-light">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <strong className="d-block">{review.user}</strong>
                                <small className="text-muted">{review.date}</small>
                              </div>
                              <div>
                                {[...Array(review.rating)].map((_, i) => (
                                  <i key={i} className="bi bi-star-fill text-warning small"></i>
                                ))}
                              </div>
                            </div>
                            <p className="mb-0 small">{review.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  {resource.tags && resource.tags.length > 0 && (
                    <div className="mb-3">
                      <h6 className="fw-bold mb-2 small text-muted">ETIQUETAS</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {resource.tags.map((tag, index) => (
                          <span key={index} className="badge bg-light text-dark border">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer d-flex justify-content-between align-items-center">
              <div className="text-muted small">
                <i className="bi bi-shield-check me-2"></i>
                Contenido verificado por la comunidad
              </div>
              <div className="d-flex gap-2">
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary btn-lg px-5"
                  onClick={handleDownload}
                >
                  <i className="bi bi-download me-2"></i>
                  Descargar Material
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResourceDetailModal;
