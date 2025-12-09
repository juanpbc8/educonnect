import { Link } from 'react-router-dom';

function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte!');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <h5>
              <i className="bi bi-journal-bookmark-fill me-2"></i>
              EduConnect
            </h5>
            <p className="mt-3">
              Plataforma académica desarrollada con enfoque en UX, prototipado rápido e iteración continua
              para optimizar la experiencia de aprendizaje.
            </p>
            <div className="mt-4">
              <a href="#" className="text-white me-3">
                <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-linkedin" style={{ fontSize: '1.5rem' }}></i>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5>Enlaces</h5>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/recursos">Recursos</Link></li>
              <li><Link to="/tutorias">Tutorías</Link></li>
              <li><Link to="/foro">Foro</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5>Legal</h5>
            <ul className="footer-links">
              <li><a href="#">Términos de Uso</a></li>
              <li><a href="#">Política de Privacidad</a></li>
              <li><a href="#">Cookies</a></li>
              <li><a href="#">Licencias</a></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5>Suscríbete a nuestro boletín</h5>
            <p className="mb-3">Recibe actualizaciones sobre nuevas funcionalidades y recursos académicos.</p>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Tu correo electrónico" 
                  required 
                />
                <button className="btn btn-primary" type="submit">Suscribirse</button>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EduConnect. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
