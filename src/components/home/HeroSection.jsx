import { useState } from 'react';
import data from '../../assets/data.json';

function HeroSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);

    // Simulate voice recognition processing
    setTimeout(() => {
      // Get available titles from actual data
      const availableTitles = data.recursos.map(r => r.titulo || r.title);
      
      const randomQuery = availableTitles[Math.floor(Math.random() * availableTitles.length)];
      setSearchQuery(randomQuery);
      setIsListening(false);
    }, 2000);
  };

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 hero-content">
            <h1 className="hero-title">Tu plataforma académica inteligente</h1>
            <p className="hero-subtitle">
              Accede a recursos educativos, conecta con tutores y participa en una comunidad de
              aprendizaje colaborativo. Diseñado con enfoque en la experiencia del usuario.
            </p>

            <div className="search-container">
              <form id="searchForm" onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Buscar recursos, materias o universidades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    id="searchInput"
                  />
                  <button 
                    className="btn btn-outline-secondary voice-search-btn" 
                    type="button"
                    onClick={handleVoiceSearch}
                    disabled={isListening}
                    title="Búsqueda por voz"
                  >
                    <i className={`bi ${isListening ? 'bi-mic-fill text-danger' : 'bi-mic-fill'}`}></i>
                  </button>
                  <button className="btn btn-primary search-btn" type="submit">
                    <i className="bi bi-search me-1"></i> Buscar
                  </button>
                </div>
              </form>

              {/* Voice Search Feedback */}
              {isListening && (
                <div className="voice-search-feedback mt-3">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="listening-pulse me-2">
                      <i className="bi bi-soundwave text-primary"></i>
                    </div>
                    <span className="text-primary fw-semibold">Escuchando...</span>
                  </div>
                  <div className="progress mt-2" style={{ height: '3px' }}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
                      role="progressbar" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4">
              <span className="text-gray">Populares: </span>
              <a href="#" className="badge bg-light text-dark me-2">Cálculo I</a>
              <a href="#" className="badge bg-light text-dark me-2">Programación</a>
              <a href="#" className="badge bg-light text-dark">Física</a>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <h5 className="card-title mb-3">Metodología de Desarrollo</h5>
                <div className="d-flex align-items-center mb-3">
                  <div className="user-avatar me-3" style={{ backgroundColor: 'var(--primary)' }}>
                    UX
                  </div>
                  <div>
                    <strong>UX Research</strong>
                    <p className="mb-0 text-gray small">Diseño centrado en el usuario</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="user-avatar me-3" style={{ backgroundColor: 'var(--secondary)' }}>
                    PR
                  </div>
                  <div>
                    <strong>Prototipado Rápido</strong>
                    <p className="mb-0 text-gray small">Iteración ágil y continua</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="user-avatar me-3" style={{ backgroundColor: 'var(--accent)' }}>
                    IT
                  </div>
                  <div>
                    <strong>Testing Iterativo</strong>
                    <p className="mb-0 text-gray small">Validación con usuarios reales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
