import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ResourceFilters from '../components/resources/ResourceFilters';
import ResourceCard from '../components/resources/ResourceCard';
import rawData from '../assets/data.json';

function Resources() {
  const [searchParams] = useSearchParams();

  // Estados de filtros - inicializar con URL params
  const initialSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedCareer, setSelectedCareer] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [sortBy, setSortBy] = useState('fecha');

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Lógica de filtrado robusta
  const filteredResources = rawData.recursos
    .filter((resource) => {
      // Filtro de búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          resource.titulo.toLowerCase().includes(searchLower) ||
          resource.descripcion.toLowerCase().includes(searchLower) ||
          resource.materia.toLowerCase().includes(searchLower) ||
          resource.carrera.toLowerCase().includes(searchLower) ||
          resource.universidadSigla.toLowerCase().includes(searchLower) ||
          resource.universidadNombre.toLowerCase().includes(searchLower) ||
          (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchLower)));

        if (!matchesSearch) return false;
      }

      // Filtro de universidad
      if (selectedUniversity && resource.universidadSigla !== selectedUniversity) {
        return false;
      }

      // Filtro de carrera
      if (selectedCareer && resource.carrera !== selectedCareer) {
        return false;
      }

      // Filtro de materia
      if (selectedMateria && resource.materia !== selectedMateria) {
        return false;
      }

      // Filtro de tipo
      if (selectedTipo && resource.tipo !== selectedTipo) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Ordenamiento
      switch (sortBy) {
        case 'fecha':
          return new Date(b.fecha) - new Date(a.fecha);
        case 'rating':
          return b.rating - a.rating;
        case 'descargas':
          return b.descargas - a.descargas;
        case 'likes':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  // Paginación
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResources = filteredResources.slice(startIndex, endIndex);

  // Handlers de filtros con reseteo de página
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterUniversity = (uni) => {
    setSelectedUniversity(uni);
    setCurrentPage(1);
  };

  const handleFilterCareer = (career) => {
    setSelectedCareer(career);
    setCurrentPage(1);
  };

  const handleFilterMateria = (materia) => {
    setSelectedMateria(materia);
    setCurrentPage(1);
  };

  const handleFilterTipo = (tipo) => {
    setSelectedTipo(tipo);
    setCurrentPage(1);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const handleLike = (resourceId) => {
    console.log('Like en recurso:', resourceId);
    // En producción, actualizar el estado o hacer petición al backend
  };

  // Generar páginas para paginación
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Recursos Académicos</h1>
              <p className="lead">
                Accede a materiales de estudio verificados y calificados por la comunidad universitaria peruana
              </p>
            </div>
            <div className="col-lg-4">
              <div className="stats-card">
                <div className="stats-number">{rawData.recursos.length}</div>
                <p className="mb-0">Recursos disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros */}
      <ResourceFilters
        universidades={rawData.universidades}
        carreras={rawData.carreras}
        materias={rawData.materias}
        onSearch={handleSearch}
        onFilterUni={handleFilterUniversity}
        onFilterCareer={handleFilterCareer}
        onFilterMateria={handleFilterMateria}
        onFilterTipo={handleFilterTipo}
        onSort={handleSort}
      />

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Resources List */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Recursos Encontrados</h3>
                <span className="badge bg-primary fs-6">{filteredResources.length}</span>
              </div>

              {/* Filtros activos */}
              {(searchTerm || selectedUniversity || selectedCareer || selectedMateria || selectedTipo) && (
                <div className="mb-4">
                  <small className="text-gray me-2">Filtros activos:</small>
                  {searchTerm && (
                    <span className="badge bg-light text-dark me-2">
                      Búsqueda: "{searchTerm}"
                      <button
                        className="btn-close btn-close-sm ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleSearch('')}
                      ></button>
                    </span>
                  )}
                  {selectedUniversity && (
                    <span className="badge bg-light text-dark me-2">
                      Universidad: {selectedUniversity}
                      <button
                        className="btn-close btn-close-sm ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleFilterUniversity('')}
                      ></button>
                    </span>
                  )}
                  {selectedCareer && (
                    <span className="badge bg-light text-dark me-2">
                      Carrera: {selectedCareer}
                      <button
                        className="btn-close btn-close-sm ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleFilterCareer('')}
                      ></button>
                    </span>
                  )}
                  {selectedMateria && (
                    <span className="badge bg-light text-dark me-2">
                      Materia: {selectedMateria}
                      <button
                        className="btn-close btn-close-sm ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleFilterMateria('')}
                      ></button>
                    </span>
                  )}
                  {selectedTipo && (
                    <span className="badge bg-light text-dark me-2">
                      Tipo: {selectedTipo}
                      <button
                        className="btn-close btn-close-sm ms-2"
                        style={{ fontSize: '0.6rem' }}
                        onClick={() => handleFilterTipo('')}
                      ></button>
                    </span>
                  )}
                </div>
              )}

              {/* Grid de recursos */}
              {currentResources.length > 0 ? (
                <div className="row">
                  {currentResources.map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      onLike={handleLike}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-search display-1 text-gray"></i>
                  <h3 className="mt-3">No se encontraron recursos</h3>
                  <p className="text-gray">Intenta ajustar tus filtros o términos de búsqueda.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleSearch('');
                      handleFilterUniversity('');
                      handleFilterCareer('');
                      handleFilterMateria('');
                      handleFilterTipo('');
                    }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}

              {/* Paginación */}
              {totalPages > 1 && (
                <nav className="mt-5">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                    </li>
                    
                    {generatePageNumbers().map((page, index) => (
                      page === '...' ? (
                        <li key={`ellipsis-${index}`} className="page-item disabled">
                          <span className="page-link">...</span>
                        </li>
                      ) : (
                        <li
                          key={page}
                          className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-3">
              {/* Quick Stats */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-graph-up me-2 text-primary"></i>
                    Estadísticas
                  </h5>
                  <div className="row text-center">
                    <div className="col-12 mb-3">
                      <div className="stats-number text-primary" style={{ fontSize: '1.5rem' }}>
                        {filteredResources.length}
                      </div>
                      <small className="text-gray">Recursos filtrados</small>
                    </div>
                    <div className="col-6">
                      <strong className="d-block">{rawData.universidades.length}</strong>
                      <small className="text-gray">Universidades</small>
                    </div>
                    <div className="col-6">
                      <strong className="d-block">{rawData.carreras.length}</strong>
                      <small className="text-gray">Carreras</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-trophy-fill me-2 text-warning"></i>
                    Top Contribuidores
                  </h5>
                  <div className="list-group list-group-flush">
                    {[
                      { name: 'Carlos M.', resources: 12, avatar: 'CM' },
                      { name: 'María Q.', resources: 10, avatar: 'MQ' },
                      { name: 'José P.', resources: 8, avatar: 'JP' },
                      { name: 'Ana T.', resources: 7, avatar: 'AT' }
                    ].map((user, index) => (
                      <div key={index} className="list-group-item border-0 px-0">
                        <div className="d-flex align-items-center">
                          <div
                            className="user-avatar me-2"
                            style={{ backgroundColor: 'var(--primary)', width: '35px', height: '35px', fontSize: '0.875rem' }}
                          >
                            {user.avatar}
                          </div>
                          <div className="flex-grow-1">
                            <strong className="d-block">{user.name}</strong>
                            <small className="text-gray">{user.resources} recursos</small>
                          </div>
                          <span className="badge bg-light text-dark">#{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Info */}
              <div className="card bg-primary text-white mb-4">
                <div className="card-body text-center">
                  <i className="bi bi-cloud-upload display-4 mb-3"></i>
                  <h5 className="card-title">¿Tienes material de estudio?</h5>
                  <p className="card-text mb-0">Comparte tus recursos con la comunidad. Usa el botón "Subir Recurso" en el menú superior.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Resources;
