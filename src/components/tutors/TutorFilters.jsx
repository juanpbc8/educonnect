/**
 * TutorFilters Component
 * Comprehensive filtering for tutors: subject, university, price range, rating, modality
 */
function TutorFilters({
  subjects,
  universities,
  filters,
  onFilterChange,
  onClearFilters
}) {
  const handleInputChange = (filterName, value) => {
    onFilterChange(filterName, value);
  };

  return (
    <div className="tutor-filters">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">
          <i className="bi bi-funnel me-2"></i>
          Filtros de Búsqueda
        </h5>
        {(filters.subject || filters.university || filters.minPrice || filters.maxPrice || filters.minRating || filters.modality) && (
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={onClearFilters}
          >
            <i className="bi bi-x-circle me-1"></i>
            Limpiar
          </button>
        )}
      </div>

      <div className="row g-3">
        {/* Subject Filter */}
        <div className="col-md-6">
          <label htmlFor="filterSubject" className="form-label fw-semibold">
            <i className="bi bi-book me-1"></i>
            Materia
          </label>
          <select
            id="filterSubject"
            className="form-select"
            value={filters.subject || ''}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          >
            <option value="">Todas las materias</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* University Filter */}
        <div className="col-md-6">
          <label htmlFor="filterUniversity" className="form-label fw-semibold">
            <i className="bi bi-building me-1"></i>
            Universidad
          </label>
          <select
            id="filterUniversity"
            className="form-select"
            value={filters.university || ''}
            onChange={(e) => handleInputChange('university', e.target.value)}
          >
            <option value="">Todas las universidades</option>
            {universities.map((uni, idx) => (
              <option key={idx} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            <i className="bi bi-cash-coin me-1"></i>
            Precio por Hora (S/.)
          </label>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Mín"
                min="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleInputChange('minPrice', e.target.value)}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Máx"
                min="0"
                value={filters.maxPrice || ''}
                onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              />
            </div>
          </div>
          <small className="text-muted">Rango de precios en Soles</small>
        </div>

        {/* Rating Filter */}
        <div className="col-md-6">
          <label htmlFor="filterRating" className="form-label fw-semibold">
            <i className="bi bi-star-fill me-1 text-warning"></i>
            Calificación Mínima
          </label>
          <select
            id="filterRating"
            className="form-select"
            value={filters.minRating || ''}
            onChange={(e) => handleInputChange('minRating', e.target.value)}
          >
            <option value="">Todas las calificaciones</option>
            <option value="4.5">4.5+ estrellas</option>
            <option value="4.0">4.0+ estrellas</option>
            <option value="3.5">3.5+ estrellas</option>
            <option value="3.0">3.0+ estrellas</option>
          </select>
        </div>

        {/* Modality Filter */}
        <div className="col-md-12">
          <label className="form-label fw-semibold">
            <i className="bi bi-laptop me-1"></i>
            Modalidad
          </label>
          <div className="btn-group w-100" role="group">
            <input
              type="radio"
              className="btn-check"
              name="modality"
              id="modalityAll"
              checked={!filters.modality}
              onChange={() => handleInputChange('modality', '')}
            />
            <label className="btn btn-outline-primary" htmlFor="modalityAll">
              Todas
            </label>

            <input
              type="radio"
              className="btn-check"
              name="modality"
              id="modalityPresencial"
              checked={filters.modality === 'Presencial'}
              onChange={() => handleInputChange('modality', 'Presencial')}
            />
            <label className="btn btn-outline-primary" htmlFor="modalityPresencial">
              <i className="bi bi-person-workspace me-1"></i>
              Presencial
            </label>

            <input
              type="radio"
              className="btn-check"
              name="modality"
              id="modalityVirtual"
              checked={filters.modality === 'Virtual'}
              onChange={() => handleInputChange('modality', 'Virtual')}
            />
            <label className="btn btn-outline-primary" htmlFor="modalityVirtual">
              <i className="bi bi-camera-video me-1"></i>
              Virtual
            </label>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(filters.subject || filters.university || filters.minPrice || filters.maxPrice || filters.minRating || filters.modality) && (
          <div className="col-12">
            <div className="alert alert-light border mb-0">
              <small className="d-block mb-2 fw-semibold">Filtros activos:</small>
              <div className="d-flex flex-wrap gap-2">
                {filters.subject && (
                  <span className="badge bg-primary">
                    Materia: {filters.subject}
                    <button 
                      className="btn-close btn-close-white ms-2" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => handleInputChange('subject', '')}
                      aria-label="Quitar filtro"
                    ></button>
                  </span>
                )}
                {filters.university && (
                  <span className="badge bg-primary">
                    Universidad: {filters.university}
                    <button 
                      className="btn-close btn-close-white ms-2" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => handleInputChange('university', '')}
                      aria-label="Quitar filtro"
                    ></button>
                  </span>
                )}
                {(filters.minPrice || filters.maxPrice) && (
                  <span className="badge bg-success">
                    Precio: S/. {filters.minPrice || '0'} - {filters.maxPrice || '∞'}
                    <button 
                      className="btn-close btn-close-white ms-2" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => {
                        handleInputChange('minPrice', '');
                        handleInputChange('maxPrice', '');
                      }}
                      aria-label="Quitar filtro"
                    ></button>
                  </span>
                )}
                {filters.minRating && (
                  <span className="badge bg-warning text-dark">
                    Rating: {filters.minRating}+ ⭐
                    <button 
                      className="btn-close ms-2" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => handleInputChange('minRating', '')}
                      aria-label="Quitar filtro"
                    ></button>
                  </span>
                )}
                {filters.modality && (
                  <span className="badge bg-info">
                    Modalidad: {filters.modality}
                    <button 
                      className="btn-close btn-close-white ms-2" 
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => handleInputChange('modality', '')}
                      aria-label="Quitar filtro"
                    ></button>
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TutorFilters;
