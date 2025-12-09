function PrototypesSection() {
  const prototypes = [
    {
      icon: 'bi-mic',
      iconSize: '3rem',
      title: 'Búsqueda por Voz',
      description: 'Busca recursos académicos usando comandos de voz para una experiencia más intuitiva.',
      feature: 'voz'
    },
    {
      icon: 'bi-robot',
      iconSize: '3rem',
      title: 'Asistente IA',
      description: 'Resuelve dudas y obtiene explicaciones personalizadas con nuestro asistente inteligente.',
      feature: 'ia'
    },
    {
      icon: 'bi-calendar-check',
      iconSize: '3rem',
      title: 'Horarios Inteligentes',
      description: 'Organiza tu tiempo de estudio y tutorías con recomendaciones basadas en IA.',
      feature: 'horarios'
    }
  ];

  const handleTestPrototype = (feature) => {
    alert(`¡Gracias por tu interés en probar el prototipo de ${feature}! Esta funcionalidad está en desarrollo y pronto estará disponible.`);
  };

  return (
    <section className="prototypes" id="prototypes">
      <div className="container">
        <div className="section-title">
          <h2>Próximas Funcionalidades</h2>
          <p>
            Estamos desarrollando nuevas características usando metodologías de prototipado rápido. ¡Tu feedback es
            esencial!
          </p>
        </div>

        <div className="row g-4">
          {prototypes.map((prototype, index) => (
            <div key={index} className="col-md-4">
              <div className="card prototype-card position-relative">
                <span className="badge bg-warning prototype-badge">Prototipo</span>
                <div className="card-body">
                  <div className="mb-3">
                    <i className={`bi ${prototype.icon} text-warning`} style={{ fontSize: prototype.iconSize }}></i>
                  </div>
                  <h4 className="card-title">{prototype.title}</h4>
                  <p className="card-text">{prototype.description}</p>
                  <button 
                    className="btn btn-outline-warning prototype-test-btn" 
                    onClick={() => handleTestPrototype(prototype.feature)}
                  >
                    <i className="bi bi-lightning me-1"></i> Probar Prototipo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PrototypesSection;
