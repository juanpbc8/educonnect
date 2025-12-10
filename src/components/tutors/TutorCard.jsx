/**
 * TutorCard Component
 * Displays tutor information with trust-building UI elements (verified badge, rating stars)
 */
function TutorCard({ tutor, onContact, isPromoted }) {
  // Generate rating stars
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }

    return stars;
  };

  // Get tutor type badge class
  const getTutorTypeBadge = (type) => {
    const typeMap = {
      advanced_student: 'tutor-type estudiante',
      graduate: 'tutor-type egresado',
      professor: 'tutor-type profesor'
    };
    return typeMap[type] || 'tutor-type estudiante';
  };

  // Generate avatar URL with fallback to ui-avatars.com
  const getAvatarUrl = () => {
    if (tutor.profileImage && tutor.profileImage.startsWith('http')) {
      return tutor.profileImage;
    }
    // Fallback to UI Avatars API
    const name = encodeURIComponent(tutor.fullName);
    return `https://ui-avatars.com/api/?name=${name}&size=200&background=random&bold=true`;
  };

  return (
    <div className="card tutor-card h-100">
      {isPromoted && (
        <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 10 }}>
          <span className="badge bg-light text-muted border text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600' }}>
            <i className="bi bi-megaphone me-1"></i>Promocionado
          </span>
        </div>
      )}
      <div className="card-body">
        {/* Header: Avatar + Name + Verified Badge */}
        <div className="text-center mb-3">
          <div className="position-relative d-inline-block">
            <div 
              className="tutor-avatar mx-auto"
              style={{
                backgroundImage: `url(${getAvatarUrl()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Empty div for avatar - background image handles display */}
            </div>
            {tutor.isVerified && (
              <span 
                className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1"
                style={{ width: '28px', height: '28px' }}
                title="Tutor Verificado"
              >
                <i className="bi bi-check-lg fw-bold"></i>
              </span>
            )}
          </div>

          <h5 className="card-title mt-3 mb-1">
            {tutor.fullName}
            {tutor.isVerified && (
              <i className="bi bi-patch-check-fill text-primary ms-2" title="Verificado"></i>
            )}
          </h5>

          <div className="mb-2">
            <span className={getTutorTypeBadge(tutor.tutorType)}>
              {tutor.tutorTypeLabel}
            </span>
          </div>

          {/* Rating */}
          <div className="rating-stars mb-2">
            {generateStars(tutor.rating)}
            <span className="ms-2 text-muted small">
              {tutor.rating.toFixed(1)} ({tutor.reviewsCount} reseñas)
            </span>
          </div>
        </div>

        {/* Body: Info */}
        <div className="mb-3">
          <p className="text-muted small mb-2">
            <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
            <strong>{tutor.specialty || 'Especialidad no especificada'}</strong>
          </p>
          <p className="text-muted small mb-2">
            <i className="bi bi-building me-2 text-primary"></i>
            {tutor.university || 'Universidad'} - {tutor.career || 'Carrera'}
          </p>
          <p className="text-muted small mb-3">
            <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
            {tutor.location || 'Ubicación no especificada'}
          </p>

          {/* Bio */}
          <p className="card-text small text-muted mb-3">
            {tutor.bio && tutor.bio.length > 100 ? `${tutor.bio.substring(0, 100)}...` : (tutor.bio || 'Sin descripción disponible')}
          </p>

          {/* Subjects */}
          <div className="mb-3">
            <small className="text-muted d-block mb-2">
              <strong>Materias:</strong>
            </small>
            <div className="d-flex flex-wrap gap-1">
              {tutor.subjects && tutor.subjects.slice(0, 3).map((subject, idx) => (
                <span key={idx} className="badge bg-light text-dark border">
                  {subject}
                </span>
              ))}
              {tutor.subjects && tutor.subjects.length > 3 && (
                <span className="badge bg-light text-dark border">
                  +{tutor.subjects.length - 3} más
                </span>
              )}
            </div>
          </div>

          {/* Modality */}
          <div className="mb-3">
            <small className="text-muted d-block mb-2">
              <strong>Modalidad:</strong>
            </small>
            <div className="d-flex flex-wrap gap-1">
              {tutor.modality && tutor.modality.map((mod, idx) => (
                <span key={idx} className="availability-chip">
                  <i className={`bi ${mod === 'Presencial' ? 'bi-person-workspace' : 'bi-camera-video'} me-1`}></i>
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer: Price + Contact Button */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="price-tag">
            {tutor.currency}{tutor.pricePerHour}
            <small className="d-block" style={{ fontSize: '0.7rem', opacity: 0.9 }}>
              por hora
            </small>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => onContact(tutor)}
          >
            <i className="bi bi-envelope me-2"></i>
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorCard;
