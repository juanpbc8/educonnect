import { useState } from 'react';

function UploadModal({ show, onHide, onUploadSuccess }) {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'PDF',
    descripcion: '',
    materia: '',
    universidad: ''
  });

  // Función para resetear y cerrar el modal
  const handleClose = () => {
    setFormData({
      titulo: '',
      tipo: 'PDF',
      descripcion: '',
      materia: '',
      universidad: ''
    });
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
    
    if (!formData.titulo.trim()) {
      alert('Por favor, ingresa un título para el recurso.');
      return;
    }

    // Crear nuevo recurso
    const newResource = {
      id: Date.now(),
      titulo: formData.titulo,
      tipo: formData.tipo,
      descripcion: formData.descripcion,
      materia: formData.materia || 'General',
      universidad: formData.universidad || 'UTP',
      autor: 'Tú',
      descargas: 0,
      likes: 0,
      rating: 50,
      fecha: new Date().toISOString().split('T')[0]
    };

    // Llamar al callback si existe
    if (onUploadSuccess) {
      onUploadSuccess(newResource);
    }

    alert('¡Recurso subido exitosamente!');
    handleClose();
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
            <h5 className="modal-title">Subir Recurso</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">Título del recurso</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ej: Exámenes Resueltos - Cálculo I"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tipo" className="form-label">Tipo de recurso</label>
                <select
                  className="form-select"
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="PDF">PDF</option>
                  <option value="Guía">Guía</option>
                  <option value="Presentación">Presentación</option>
                  <option value="Ejercicios">Ejercicios</option>
                  <option value="Formulario">Formulario</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="materia" className="form-label">Materia</label>
                <input
                  type="text"
                  className="form-control"
                  id="materia"
                  name="materia"
                  value={formData.materia}
                  onChange={handleChange}
                  placeholder="Ej: Cálculo I"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="universidad" className="form-label">Universidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="universidad"
                  name="universidad"
                  value={formData.universidad}
                  onChange={handleChange}
                  placeholder="Ej: UTP"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  name="descripcion"
                  rows="3"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Describe brevemente el contenido del recurso..."
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="archivo" className="form-label">Archivo</label>
                <input
                  type="file"
                  className="form-control"
                  id="archivo"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <small className="text-gray">Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX</small>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Subir Recurso
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
