import { useState } from 'react';

/**
 * CreatePostModal Component
 * Modal for creating new forum posts
 */
function CreatePostModal({ show, onHide, onPostCreate, categories, existingPosts = [] }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
    materia: '',
    universidad: '',
    carrera: ''
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres';
    }

    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'El contenido es requerido';
    } else if (formData.content.length < 20) {
      newErrors.content = 'El contenido debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag);

    // Get selected category details
    const selectedCategory = categories.find(cat => cat.id === parseInt(formData.category));

    // Calculate next ID based on existing posts
    const maxId = existingPosts.length > 0 
      ? Math.max(...existingPosts.map(p => p.id))
      : 0;

    // Create new post object
    const newPost = {
      id: maxId + 1, // Temporary ID (in real app, backend would assign)
      title: formData.title.trim(),
      content: formData.content.trim(),
      authorId: 'current_user', // Would come from auth context
      authorName: 'Usuario Actual', // Would come from auth context
      universidadSigla: formData.universidad || 'UTP',
      carrera: formData.carrera || 'General',
      categoryId: selectedCategory.id,
      categoryName: selectedCategory.nombre,
      materia: formData.materia.trim() || null,
      date: new Date().toISOString(),
      stats: {
        views: 0,
        likes: 0,
        replies: 0
      },
      tags: tagsArray,
      status: 'open',
      replies: []
    };

    // Call parent callback
    onPostCreate(newPost);

    // Reset form and close modal
    handleClose();
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      title: '',
      category: '',
      content: '',
      tags: '',
      materia: '',
      universidad: '',
      carrera: ''
    });
    setErrors({});
    onHide();
  };

  if (!show) return null;

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ display: 'block' }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i>
                Crear Nuevo Tema
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleClose}
                aria-label="Cerrar"
              ></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form id="createPostForm" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-3">
                  <label htmlFor="postTitle" className="form-label fw-semibold">
                    Título <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="postTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Escribe un título claro y descriptivo"
                    maxLength="200"
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                  <small className="text-muted">
                    {formData.title.length}/200 caracteres
                  </small>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label htmlFor="postCategory" className="form-label fw-semibold">
                    Categoría <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    id="postCategory"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre} - {cat.descripcion}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label htmlFor="postContent" className="form-label fw-semibold">
                    Contenido <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                    id="postContent"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Describe tu pregunta o tema en detalle..."
                    maxLength="2000"
                  ></textarea>
                  {errors.content && (
                    <div className="invalid-feedback">{errors.content}</div>
                  )}
                  <small className="text-muted">
                    {formData.content.length}/2000 caracteres
                  </small>
                </div>

                {/* Additional Info Row */}
                <div className="row g-3 mb-3">
                  {/* University */}
                  <div className="col-md-4">
                    <label htmlFor="postUniversity" className="form-label fw-semibold">
                      Universidad
                    </label>
                    <select
                      className="form-select"
                      id="postUniversity"
                      name="universidad"
                      value={formData.universidad}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar</option>
                      <option value="UTP">UTP</option>
                      <option value="UNMSM">UNMSM</option>
                      <option value="UPC">UPC</option>
                      <option value="UNI">UNI</option>
                      <option value="PUCP">PUCP</option>
                      <option value="UNT">UNT</option>
                      <option value="USMP">USMP</option>
                    </select>
                  </div>

                  {/* Career */}
                  <div className="col-md-4">
                    <label htmlFor="postCareer" className="form-label fw-semibold">
                      Carrera
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postCareer"
                      name="carrera"
                      value={formData.carrera}
                      onChange={handleChange}
                      placeholder="Ej: Ing. de Sistemas"
                    />
                  </div>

                  {/* Subject */}
                  <div className="col-md-4">
                    <label htmlFor="postSubject" className="form-label fw-semibold">
                      Materia
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="postSubject"
                      name="materia"
                      value={formData.materia}
                      onChange={handleChange}
                      placeholder="Ej: Cálculo I"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-3">
                  <label htmlFor="postTags" className="form-label fw-semibold">
                    Tags (Etiquetas)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Separa por comas: calculo, ayuda, urgente"
                  />
                  <small className="text-muted">
                    Las etiquetas ayudan a otros estudiantes a encontrar tu tema
                  </small>
                </div>

                {/* Info Alert */}
                <div className="alert alert-info d-flex align-items-start" role="alert">
                  <i className="bi bi-info-circle me-2 mt-1"></i>
                  <div>
                    <strong>Consejos:</strong>
                    <ul className="mb-0 mt-1 ps-3">
                      <li>Sé claro y específico en tu pregunta</li>
                      <li>Incluye contexto relevante (universidad, curso, tema)</li>
                      <li>Usa etiquetas para que otros te encuentren fácilmente</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                form="createPostForm"
              >
                <i className="bi bi-send me-2"></i>
                Publicar Tema
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePostModal;
