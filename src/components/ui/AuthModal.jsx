import { useState } from 'react';

function AuthModal({ show, onHide }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  // Función para resetear y cerrar el modal
  const handleClose = () => {
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
    setIsLogin(true);
    onHide();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Lógica de login (simulada)
      alert(`¡Bienvenido! Iniciando sesión con ${formData.email}`);
      handleClose();
    } else {
      // Validar registro
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      alert(`¡Cuenta creada exitosamente! Bienvenido ${formData.name}`);
      handleClose();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  return (
    <div 
      className={`modal fade ${show ? 'show' : ''}`} 
      style={{ display: show ? 'block' : 'none' }}
      tabIndex="-1"
      aria-hidden={!show}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              )}

              {isLogin && (
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Recordarme
                  </label>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
              </button>
            </form>

            {isLogin && (
              <div className="text-center mt-3">
                <a href="#" className="text-gray">¿Olvidaste tu contraseña?</a>
              </div>
            )}

            <hr className="my-4" />

            <div className="text-center">
              <p className="text-gray mb-2">
                {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              </p>
              <button 
                type="button"
                className="btn btn-outline-primary" 
                onClick={toggleMode}
              >
                {isLogin ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
