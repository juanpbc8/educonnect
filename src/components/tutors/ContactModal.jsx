import { useState } from 'react';
import { trackEvent } from '../../utils/analytics';

/**
 * ContactModal Component
 * Modal for contacting tutors with form validation
 */
function ContactModal({ show, onHide, tutor }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    subject: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
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

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Tu nombre es requerido';
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'Tu email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      newErrors.studentEmail = 'Email inválido';
    }

    if (!formData.subject) {
      newErrors.subject = 'Selecciona una materia';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 20) {
      newErrors.message = 'El mensaje debe tener al menos 20 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Track conversion event in Google Analytics
    trackEvent('Tutorias', 'Contactar_Tutor', tutor.fullName);

    // Simulate sending request (in real app, this would be an API call)
    console.log('Contacto enviado:', {
      tutor: tutor.fullName,
      ...formData
    });

    // Close modal
    handleClose();

    // Show success alert
    alert(`¡Solicitud enviada a ${tutor.fullName}! Te contactarán pronto a ${formData.studentEmail}.`);
  };

  // Handle close
  const handleClose = () => {
    setFormData({
      studentName: '',
      studentEmail: '',
      subject: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setErrors({});
    onHide();
  };

  if (!show || !tutor) return null;

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

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
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-envelope me-2"></i>
                Contactar Tutor
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
              {/* Tutor Summary */}
              <div className="alert alert-light border mb-4">
                <div className="d-flex align-items-center">
                  <div 
                    className="tutor-avatar me-3"
                    style={{
                      backgroundImage: `url(${tutor.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.fullName)}&size=80&background=random`})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '60px',
                      height: '60px'
                    }}
                  ></div>
                  <div>
                    <h6 className="mb-1">
                      {tutor.fullName}
                      {tutor.isVerified && (
                        <i className="bi bi-patch-check-fill text-primary ms-2" title="Verificado"></i>
                      )}
                    </h6>
                    <p className="text-muted small mb-0">
                      {tutor.specialty} • {tutor.university}
                    </p>
                    <p className="text-muted small mb-0">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      {tutor.rating.toFixed(1)} ({tutor.reviewsCount} reseñas)
                      <span className="mx-2">•</span>
                      <strong className="text-success">
                        {tutor.currency}{tutor.pricePerHour}/hora
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form id="contactForm" onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Student Name */}
                  <div className="col-md-6">
                    <label htmlFor="studentName" className="form-label fw-semibold">
                      Tu Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.studentName ? 'is-invalid' : ''}`}
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Ej: Juan Pérez"
                    />
                    {errors.studentName && (
                      <div className="invalid-feedback">{errors.studentName}</div>
                    )}
                  </div>

                  {/* Student Email */}
                  <div className="col-md-6">
                    <label htmlFor="studentEmail" className="form-label fw-semibold">
                      Tu Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.studentEmail ? 'is-invalid' : ''}`}
                      id="studentEmail"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleChange}
                      placeholder="ejemplo@email.com"
                    />
                    {errors.studentEmail && (
                      <div className="invalid-feedback">{errors.studentEmail}</div>
                    )}
                  </div>

                  {/* Subject Selection */}
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label fw-semibold">
                      Materia de Interés <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona una materia</option>
                      {tutor.subjects.map((subject, idx) => (
                        <option key={idx} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div className="col-md-6">
                    <label htmlFor="preferredDate" className="form-label fw-semibold">
                      Fecha Preferida (Opcional)
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={today}
                    />
                  </div>

                  {/* Preferred Time */}
                  <div className="col-md-6">
                    <label htmlFor="preferredTime" className="form-label fw-semibold">
                      Hora Preferida (Opcional)
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Mensaje <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Cuéntale al tutor sobre tus necesidades, dudas específicas, o temas en los que necesitas ayuda..."
                      maxLength="500"
                    ></textarea>
                    {errors.message && (
                      <div className="invalid-feedback">{errors.message}</div>
                    )}
                    <small className="text-muted">
                      {formData.message.length}/500 caracteres
                    </small>
                  </div>

                  {/* Info Note */}
                  <div className="col-12">
                    <div className="alert alert-info d-flex align-items-start mb-0">
                      <i className="bi bi-info-circle me-2 mt-1"></i>
                      <small>
                        <strong>Nota:</strong> El tutor recibirá tu solicitud y te contactará directamente a tu email para coordinar horarios y detalles de pago.
                      </small>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <div className="w-100">
                {/* Price Breakdown */}
                <div className="bg-light p-3 rounded mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tarifa del tutor:</span>
                    <span>{tutor.currency}{tutor.pricePerHour.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Comisión de servicio (10%):</span>
                    <span>{tutor.currency}{(tutor.pricePerHour * 0.10).toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-between">
                    <strong>Total por hora:</strong>
                    <strong>{tutor.currency}{(tutor.pricePerHour + tutor.pricePerHour * 0.10).toFixed(2)}</strong>
                  </div>
                </div>
                
                <div className="d-flex justify-content-end gap-2">
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
                    form="contactForm"
                  >
                    <i className="bi bi-send me-2"></i>
                    Enviar Solicitud
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactModal;
