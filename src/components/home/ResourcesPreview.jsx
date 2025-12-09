import { useState } from 'react';
import { Link } from 'react-router-dom';

function ResourcesPreview({ resources }) {
  const [likedResources, setLikedResources] = useState({});

  const handleLike = (resourceId) => {
    setLikedResources(prev => ({
      ...prev,
      [resourceId]: !prev[resourceId]
    }));
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'PDF': return 'bg-primary';
      case 'Guía': return 'bg-success';
      case 'Presentación': return 'bg-warning';
      case 'Ejercicios': return 'bg-info';
      case 'Formulario': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  };

  // Mostrar solo los primeros 6 recursos
  const featuredResources = resources.slice(0, 6);

  return (
    <section className="resources" id="resources">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="mb-1">Recursos Académicos</h2>
                <p className="text-gray">Materiales verificados y calificados por la comunidad</p>
              </div>
              <div className="text-end">
                <span className="badge bg-primary">{featuredResources.length}</span> recursos destacados
              </div>
            </div>

            <div className="row g-4">
              {featuredResources.map((resource) => (
                <div key={resource.id} className="col-md-6">
                  <div className="card resource-card border-0 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <div className="resource-header">
                        <div>
                          <h5 className="card-title mb-2">{resource.titulo}</h5>
                          <span className={`badge ${getTypeClass(resource.tipo)} mb-2`}>
                            {resource.tipo}
                          </span>
                        </div>
                      </div>
                      <p className="card-text text-gray mb-3">{resource.descripcion}</p>
                      <div className="mb-3">
                        <small className="text-gray">
                          <i className="bi bi-building me-1"></i> {resource.universidadSigla || resource.universidad}
                          {resource.profesor && (
                            <>
                              <span className="mx-2">•</span>
                              <i className="bi bi-person me-1"></i> {resource.profesor}
                            </>
                          )}
                          {resource.autor && !resource.profesor && (
                            <>
                              <span className="mx-2">•</span>
                              <i className="bi bi-person me-1"></i> {resource.autor}
                            </>
                          )}
                        </small>
                      </div>
                      <div className="progress mb-2">
                        <div 
                          className="progress-bar bg-primary" 
                          role="progressbar" 
                          style={{ width: `${resource.rating}%` }}
                          aria-valuenow={resource.rating} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <div className="resource-actions">
                        <div className="d-flex gap-3">
                          <span className="text-gray">
                            <i className="bi bi-download me-1"></i> {resource.descargas}
                          </span>
                          <button 
                            className="btn btn-link p-0 text-gray like-btn" 
                            onClick={() => handleLike(resource.id)}
                            style={{ textDecoration: 'none' }}
                          >
                            <i className={`bi ${likedResources[resource.id] ? 'bi-hand-thumbs-up-fill text-primary' : 'bi-hand-thumbs-up'} me-1`}></i>
                            <span>{resource.likes + (likedResources[resource.id] ? 1 : 0)}</span>
                          </button>
                        </div>
                        <span className="badge bg-light text-dark">{resource.rating}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-5">
              <Link to="/recursos" className="btn btn-primary btn-lg">
                <i className="bi bi-collection me-2"></i>
                Ver Todos los Recursos
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="sidebar">
              <div className="card community-card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-people-fill me-2 text-primary"></i>
                    Comunidad Activa
                  </h5>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-gray">Estudiantes activos</span>
                    <strong className="text-primary">1,234</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-gray">Recursos compartidos</span>
                    <strong className="text-primary">567</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-gray">Tutorías este mes</span>
                    <strong className="text-primary">89</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-gray">Publicaciones foro</span>
                    <strong className="text-primary">2,345</strong>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">
                    <i className="bi bi-trophy-fill me-2 text-warning"></i>
                    Top Contribuidores
                  </h5>
                  {[
                    { name: 'Carlos M.', points: 1250, avatar: 'CM' },
                    { name: 'María Q.', points: 980, avatar: 'MQ' },
                    { name: 'José P.', points: 875, avatar: 'JP' }
                  ].map((user, index) => (
                    <div key={index} className="d-flex align-items-center mb-3">
                      <div className="user-avatar me-2" style={{ backgroundColor: 'var(--primary)' }}>
                        {user.avatar}
                      </div>
                      <div className="flex-grow-1">
                        <strong className="d-block">{user.name}</strong>
                        <small className="text-gray">{user.points} puntos</small>
                      </div>
                      <span className="badge bg-light text-dark">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesPreview;
