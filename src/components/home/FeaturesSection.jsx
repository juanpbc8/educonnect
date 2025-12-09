function FeaturesSection() {
  const features = [
    {
      icon: 'bi-search-heart',
      iconBg: 'primary',
      title: 'Búsqueda Inteligente',
      description: 'Encuentra rápidamente los recursos más relevantes con nuestro sistema de búsqueda optimizado por UX research.'
    },
    {
      icon: 'bi-people',
      iconBg: 'secondary',
      title: 'Comunidad Activa',
      description: 'Conecta con otros estudiantes, comparte conocimientos y resuelve dudas en nuestro foro colaborativo.'
    },
    {
      icon: 'bi-graph-up',
      iconBg: 'accent',
      title: 'Mejora Continua',
      description: 'La plataforma evoluciona constantemente con base en datos de uso y feedback de la comunidad.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-title">
          <h2>Diseñado para optimizar tu aprendizaje</h2>
          <p>
            EduConnect integra principios de UX, prototipado rápido e iteración continua para ofrecer una experiencia
            educativa excepcional.
          </p>
        </div>

        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4">
              <div className="card feature-card border-0 shadow-sm">
                <div className={`feature-icon ${feature.iconBg}`}>
                  <i className={`bi ${feature.icon}`}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
