import { useState } from 'react';

function ResourceFilters({ 
  universidades, 
  carreras, 
  materias,
  onSearch, 
  onFilterUni, 
  onFilterCareer,
  onFilterMateria,
  onFilterTipo,
  onSort
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const tipos = ['PDF', 'Guía', 'Apuntes', 'Ejercicios', 'Presentación', 'Formulario', 'Resumen'];

  return (
    <section className="resource-filters">
      <div className="container">
        <div className="row align-items-center mb-3">
          <div className="col-lg-8">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Buscar recursos, materias o universidades..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-primary search-btn" type="submit">
                    <i className="bi bi-search me-1"></i> Buscar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-4 text-end">
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="sortDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-sort-down me-1"></i> Ordenar por
              </button>
              <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => onSort && onSort('fecha')}>
                    Más recientes
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => onSort && onSort('rating')}>
                    Mejor calificados
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => onSort && onSort('descargas')}>
                    Más descargados
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => onSort && onSort('likes')}>
                    Más valorados
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="row">
          <div className="col-12">
            <h6 className="fw-semibold mb-3">Filtrar por:</h6>

            {/* Universidad Filter */}
            <div className="mb-3">
              <span className="me-2 fw-medium">Universidad:</span>
              <button
                className="filter-chip active"
                onClick={() => onFilterUni && onFilterUni('')}
              >
                Todas
              </button>
              {universidades.map((uni) => (
                <button
                  key={uni.id}
                  className="filter-chip"
                  onClick={() => onFilterUni && onFilterUni(uni.sigla)}
                >
                  {uni.sigla}
                </button>
              ))}
            </div>

            {/* Tipo Filter */}
            <div className="mb-3">
              <span className="me-2 fw-medium">Tipo:</span>
              <button
                className="filter-chip active"
                onClick={() => onFilterTipo && onFilterTipo('')}
              >
                Todos
              </button>
              {tipos.map((tipo) => (
                <button
                  key={tipo}
                  className="filter-chip"
                  onClick={() => onFilterTipo && onFilterTipo(tipo)}
                >
                  {tipo}
                </button>
              ))}
            </div>

            {/* Carrera Filter */}
            <div className="mb-3">
              <span className="me-2 fw-medium">Carrera:</span>
              <button
                className="filter-chip active"
                onClick={() => onFilterCareer && onFilterCareer('')}
              >
                Todas
              </button>
              {carreras.slice(0, 10).map((carrera, index) => (
                <button
                  key={index}
                  className="filter-chip"
                  onClick={() => onFilterCareer && onFilterCareer(carrera)}
                >
                  {carrera}
                </button>
              ))}
            </div>

            {/* Materia Filter */}
            <div className="mb-3">
              <span className="me-2 fw-medium">Materia:</span>
              <button
                className="filter-chip active"
                onClick={() => onFilterMateria && onFilterMateria('')}
              >
                Todas
              </button>
              {materias.slice(0, 8).map((materia, index) => (
                <button
                  key={index}
                  className="filter-chip"
                  onClick={() => onFilterMateria && onFilterMateria(materia)}
                >
                  {materia}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourceFilters;
