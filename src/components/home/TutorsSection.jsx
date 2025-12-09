function TutorsSection() {
  const tutors = [
    {
      name: 'María Rodríguez',
      avatar: 'MR',
      specialty: 'Cálculo y Álgebra',
      university: 'UNMSM',
      rating: 4.9,
      sessions: 156,
      price: 'S/ 35/hora'
    },
    {
      name: 'Carlos Vega',
      avatar: 'CV',
      specialty: 'Programación',
      university: 'UTP',
      rating: 4.8,
      sessions: 134,
      price: 'S/ 40/hora'
    },
    {
      name: 'Ana Torres',
      avatar: 'AT',
      specialty: 'Física y Química',
      university: 'UNI',
      rating: 5.0,
      sessions: 203,
      price: 'S/ 45/hora'
    }
  ];

  return (
    <section className="tutors" id="tutors">
      <div className="container">
        <div className="section-title">
          <h2>Encuentra el Tutor Perfecto</h2>
          <p>Conecta con tutores especializados en diferentes materias y niveles académicos.</p>
        </div>

        <div className="row g-4">
          {tutors.map((tutor, index) => (
            <div key={index} className="col-md-4">
              <div className="card tutor-card border-0 shadow-sm">
                <div className="card-body">
                  <div className="user-avatar mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '1.5rem' }}>
                    {tutor.avatar}
                  </div>
                  <h4 className="card-title">{tutor.name}</h4>
                  <p className="text-primary mb-2">{tutor.specialty}</p>
                  <p className="text-gray mb-3">
                    <i className="bi bi-building me-1"></i> {tutor.university}
                  </p>
                  <div className="rating mb-3">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className={tutor.rating === 5.0 ? 'bi bi-star-fill' : 'bi bi-star-half'}></i>
                    <span className="ms-2 text-dark">{tutor.rating}</span>
                  </div>
                  <div className="mb-3">
                    <small className="text-gray">
                      <i className="bi bi-calendar-check me-1"></i> {tutor.sessions} sesiones
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong className="text-primary">{tutor.price}</strong>
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-calendar-plus me-1"></i> Agendar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TutorsSection;
