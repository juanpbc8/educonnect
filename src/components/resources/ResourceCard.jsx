import { useState } from 'react';

function ResourceCard({ resource, onLike }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) {
      onLike(resource.id);
    }
  };

  // Función para obtener el ícono según el tipo de archivo
  const getFileIcon = (tipo) => {
    switch (tipo) {
      case 'PDF':
        return 'bi-file-pdf-fill text-danger';
      case 'Guía':
        return 'bi-book-fill text-success';
      case 'Apuntes':
        return 'bi-journal-text text-info';
      case 'Ejercicios':
        return 'bi-pencil-square text-warning';
      case 'Presentación':
        return 'bi-easel-fill text-primary';
      case 'Formulario':
        return 'bi-file-earmark-ruled-fill text-secondary';
      case 'Resumen':
        return 'bi-file-text-fill text-info';
      default:
        return 'bi-file-earmark text-dark';
    }
  };

  // Función para obtener la clase del badge según el tipo
  const getTypeClass = (tipo) => {
    switch (tipo) {
      case 'PDF': return 'bg-danger';
      case 'Guía': return 'bg-success';
      case 'Apuntes': return 'bg-info';
      case 'Ejercicios': return 'bg-warning';
      case 'Presentación': return 'bg-primary';
      case 'Formulario': return 'bg-secondary';
      case 'Resumen': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card resource-card h-100">
        <div className="card-body d-flex flex-column">
          {/* Header con icono y título */}
          <div className="d-flex align-items-start mb-3">
            <i className={`bi ${getFileIcon(resource.tipo)} me-3`} style={{ fontSize: '2rem' }}></i>
            <div className="flex-grow-1">
              <h5 className="card-title mb-2">{resource.titulo}</h5>
              <span className={`badge ${getTypeClass(resource.tipo)}`}>
                {resource.tipo}
              </span>
            </div>
          </div>

          {/* Descripción */}
          <p className="card-text text-gray mb-3 flex-grow-1">
            {resource.descripcion}
          </p>

          {/* Metadata */}
          <div className="resource-meta mb-3">
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-building me-2"></i>
              <span>{resource.universidadSigla}</span>
            </div>
            {resource.carrera && (
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-mortarboard me-2"></i>
                <span>{resource.carrera}</span>
              </div>
            )}
            {resource.materia && (
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-book me-2"></i>
                <span>{resource.materia}</span>
              </div>
            )}
            {resource.profesor && (
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-person-badge me-2"></i>
                <span>Prof. {resource.profesor}</span>
              </div>
            )}
            {resource.autor && !resource.profesor && (
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-person me-2"></i>
                <span>{resource.autor}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="progress mb-2" style={{ height: '6px' }}>
            <div
              className="progress-bar bg-primary"
              role="progressbar"
              style={{ width: `${resource.rating}%` }}
              aria-valuenow={resource.rating}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>

          {/* Actions */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <span className="text-gray">
                <i className="bi bi-download me-1"></i>
                {resource.descargas}
              </span>
              <button
                className="btn btn-link p-0 text-decoration-none"
                onClick={handleLike}
                style={{ border: 'none', background: 'none' }}
              >
                <i className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill text-primary' : 'bi-hand-thumbs-up text-gray'} me-1`}></i>
                <span className={isLiked ? 'text-primary' : 'text-gray'}>
                  {resource.likes + (isLiked ? 1 : 0)}
                </span>
              </button>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <span className="badge bg-light text-dark">{resource.rating}%</span>
              <button className="btn btn-primary btn-sm">
                <i className="bi bi-download"></i>
              </button>
            </div>
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-3">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="badge bg-light text-dark me-1">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
