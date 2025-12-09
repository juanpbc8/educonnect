import { Link } from 'react-router-dom';

function ForumCTA() {
  return (
    <section className="forum" id="forum">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card forum-card border-0 shadow-lg">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="bi bi-chat-dots display-1 text-primary"></i>
                </div>
                <h2 className="mb-3">Únete a la Conversación</h2>
                <p className="text-gray mb-4 lead">
                  Pregunta, responde y colabora con otros estudiantes en nuestra comunidad activa.
                  Resuelve tus dudas académicas y ayuda a otros a crecer.
                </p>
                <Link to="/foro" className="btn btn-primary btn-lg">
                  <i className="bi bi-chat-left-text me-2"></i>
                  Explorar el Foro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForumCTA;
