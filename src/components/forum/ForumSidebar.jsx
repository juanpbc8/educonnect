/**
 * ForumSidebar Component
 * Displays forum categories with active state and "Nuevo Tema" button
 */
function ForumSidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect, 
  onNewTopicClick,
  postCounts = {}
}) {
  return (
    <aside className="forum-sidebar">
      {/* New Topic Button */}
      <button 
        className="btn btn-primary w-100 mb-4 d-flex align-items-center justify-content-center"
        onClick={onNewTopicClick}
      >
        <i className="bi bi-plus-circle me-2"></i>
        Nuevo Tema
      </button>

      {/* Categories List */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h6 className="mb-0 fw-semibold">
            <i className="bi bi-list-ul me-2"></i>
            Categorías
          </h6>
        </div>
        <div className="list-group list-group-flush">
          {/* "All" category */}
          <button
            className={`list-group-item list-group-item-action d-flex align-items-center ${
              selectedCategory === null ? 'active' : ''
            }`}
            onClick={() => onCategorySelect(null)}
          >
            <i className="bi bi-grid-3x3-gap me-3 fs-5"></i>
            <div className="flex-grow-1">
              <div className="fw-semibold">Todas las Categorías</div>
              <small className="text-muted">Ver todos los temas</small>
            </div>
            <span className="badge bg-secondary rounded-pill">
              {Object.values(postCounts).reduce((a, b) => a + b, 0)}
            </span>
          </button>

          {/* Individual categories */}
          {categories.map((category) => (
            <button
              key={category.id}
              className={`list-group-item list-group-item-action d-flex align-items-center ${
                selectedCategory === category.id ? 'active' : ''
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <i className={`${category.icono} me-3 fs-5`}></i>
              <div className="flex-grow-1">
                <div className="fw-semibold">{category.nombre}</div>
                <small className="text-muted">{category.descripcion}</small>
              </div>
              <span className={`badge bg-${category.color} rounded-pill`}>
                {postCounts[category.id] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags Widget */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-header bg-white border-0 py-3">
          <h6 className="mb-0 fw-semibold">
            <i className="bi bi-tags me-2"></i>
            Tags Populares
          </h6>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            <span className="tag-chip">calculo</span>
            <span className="tag-chip">programacion</span>
            <span className="tag-chip">anatomia</span>
            <span className="tag-chip">ayuda</span>
            <span className="tag-chip">examenes</span>
            <span className="tag-chip">apuntes</span>
          </div>
        </div>
      </div>

      {/* Forum Stats Widget */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body text-center">
          <div className="mb-3">
            <i className="bi bi-chat-dots fs-1 text-primary"></i>
          </div>
          <h3 className="fw-bold mb-1">
            {Object.values(postCounts).reduce((a, b) => a + b, 0)}
          </h3>
          <p className="text-muted mb-0">Temas activos</p>
        </div>
      </div>
    </aside>
  );
}

export default ForumSidebar;
