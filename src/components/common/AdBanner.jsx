/**
 * AdBanner Component
 * Displays simulated ads for the free tier
 * Demonstrates the value of upgrading to Pro (Ad-free experience)
 * 
 * @param {string} variant - 'sidebar' or 'horizontal'
 */
function AdBanner({ variant = 'sidebar' }) {
  // Check if user has Pro subscription (from localStorage)
  // In a real app, this would come from user context/state management
  const isPro = typeof window !== 'undefined' && 
                localStorage.getItem('educonnect_isPro') === 'true';

  // Don't render ads for Pro users
  if (isPro) {
    return null;
  }

  // Ad content variations (randomly selected)
  const adContents = [
    {
      headline: '¿Dominas el Inglés?',
      description: 'Certificación TOEFL en 3 meses',
      cta: 'Más información',
      icon: 'bi-translate',
      color: '#e3f2fd'
    },
    {
      headline: 'Bootcamp de Programación',
      description: 'Conviértete en Full Stack Developer',
      cta: 'Inscríbete ahora',
      icon: 'bi-code-slash',
      color: '#f3e5f5'
    },
    {
      headline: 'Master en Data Science',
      description: 'Aprende ML y AI desde cero',
      cta: 'Ver detalles',
      icon: 'bi-graph-up-arrow',
      color: '#e8f5e9'
    },
    {
      headline: 'Preparación Pre-Médica',
      description: 'Ingresa a la carrera de Medicina',
      cta: 'Conoce más',
      icon: 'bi-heart-pulse',
      color: '#fce4ec'
    }
  ];

  // Select a random ad (or use index based on variant for consistency)
  const selectedAd = adContents[variant === 'sidebar' ? 0 : 1];

  const isSidebar = variant === 'sidebar';

  return (
    <div 
      className={`ad-banner ${isSidebar ? 'ad-sidebar' : 'ad-horizontal'}`}
      style={{
        backgroundColor: '#fff3cd',
        border: '1px dashed #ddd',
        borderRadius: '8px',
        padding: isSidebar ? '16px' : '12px 20px',
        marginTop: isSidebar ? '20px' : '16px',
        position: 'relative'
      }}
    >
      {/* Ad Label */}
      <div 
        style={{
          position: 'absolute',
          top: '4px',
          right: '8px',
          fontSize: '0.65rem',
          color: '#6c757d',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}
      >
        Publicidad
      </div>

      {/* Ad Content */}
      <div className={`d-flex ${isSidebar ? 'flex-column' : 'flex-row align-items-center'} gap-3`}>
        {/* Icon/Image Placeholder */}
        <div 
          style={{
            backgroundColor: '#e9ecef',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isSidebar ? '100%' : '80px',
            height: isSidebar ? '120px' : '80px',
            flexShrink: 0
          }}
        >
          <i 
            className={`${selectedAd.icon} text-secondary`}
            style={{ fontSize: isSidebar ? '3rem' : '2.5rem' }}
          ></i>
        </div>

        {/* Text Content */}
        <div className="flex-grow-1">
          <h6 
            className="fw-bold mb-2" 
            style={{ 
              fontSize: isSidebar ? '0.95rem' : '1rem',
              color: '#212529',
              lineHeight: '1.3'
            }}
          >
            {selectedAd.headline}
          </h6>
          <p 
            className="text-muted mb-3" 
            style={{ 
              fontSize: isSidebar ? '0.8rem' : '0.85rem',
              lineHeight: '1.4',
              marginBottom: isSidebar ? '12px' : '8px'
            }}
          >
            {selectedAd.description}
          </p>

          {/* CTA Button */}
          <button 
            className="btn btn-sm btn-outline-dark w-100"
            style={{
              fontSize: '0.8rem',
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: '500'
            }}
            onClick={() => {
              // Simulate ad click (could track analytics here)
              alert('Esta es una publicidad simulada.\n\n¡Hazte Pro para eliminar todos los anuncios!');
            }}
          >
            {selectedAd.cta}
          </button>
        </div>
      </div>

      {/* Subtle "Go Pro" hint */}
      <div 
        className="text-center mt-3 pt-2"
        style={{ borderTop: '1px dashed #dee2e6' }}
      >
        <small 
          className="text-muted" 
          style={{ fontSize: '0.7rem' }}
        >
          <i className="bi bi-gem me-1"></i>
          <a 
            href="#" 
            className="text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              // Could trigger pricing modal here
              alert('¡Hazte Pro para navegar sin anuncios!');
            }}
          >
            Hazte Pro
          </a> para eliminar anuncios
        </small>
      </div>
    </div>
  );
}

export default AdBanner;
