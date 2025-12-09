import { useState } from 'react';

/**
 * ForumPostCard Component
 * Displays a single forum post with avatar, stats, tags, and interactions
 */
function ForumPostCard({ post, onClick }) {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.stats.likes);

  // Generate avatar initials from author name
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Generate avatar color based on author ID
  const getAvatarColor = (authorId) => {
    const colors = [
      'bg-primary',
      'bg-success', 
      'bg-info',
      'bg-warning',
      'bg-danger',
      'bg-secondary'
    ];
    const hash = authorId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Calculate time ago from date
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Justo ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    
    return date.toLocaleDateString('es-PE', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };

  // Handle like button
  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const statusMap = {
      open: { label: 'Abierto', class: 'status-badge abierto' },
      resolved: { label: 'Resuelto', class: 'status-badge resuelto' },
      closed: { label: 'Cerrado', class: 'status-badge cerrado' }
    };
    return statusMap[status] || statusMap.open;
  };

  const statusBadge = getStatusBadge(post.status);

  return (
    <div className="card post-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="card-body">
        <div className="d-flex">
          {/* Vote Section */}
          <div className="vote-buttons me-3">
            <button 
              className={`vote-btn ${liked ? 'voted' : ''}`}
              onClick={handleLike}
              aria-label="Me gusta"
            >
              <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
            </button>
            <div className="fw-bold text-center">{localLikes}</div>
          </div>

          {/* Main Content */}
          <div className="flex-grow-1">
            {/* Post Header */}
            <div className="d-flex align-items-start mb-2">
              {/* Author Avatar */}
              <div className={`user-badge ${getAvatarColor(post.authorId)} me-2`}>
                {getInitials(post.authorName)}
              </div>

              {/* Post Meta */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <div>
                    <span className="fw-semibold me-2">{post.authorName}</span>
                    <span className="post-meta">
                      <i className="bi bi-clock me-1"></i>
                      {getTimeAgo(post.date)}
                    </span>
                  </div>
                  <span className={statusBadge.class}>{statusBadge.label}</span>
                </div>
                <div className="post-meta">
                  <i className="bi bi-building me-1"></i>
                  {post.universidadSigla} - {post.carrera}
                  {post.materia && (
                    <>
                      <span className="mx-1">•</span>
                      <i className="bi bi-book me-1"></i>
                      {post.materia}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Post Title */}
            <h5 className="card-title mb-2 post-title">
              <i className={`bi bi-chat-left-text me-2 text-${post.categoryName === 'Recursos' ? 'success' : 'primary'}`}></i>
              {post.title}
            </h5>

            {/* Post Content Preview */}
            <p className="card-text text-muted mb-2">
              {post.content.length > 150 
                ? `${post.content.substring(0, 150)}...` 
                : post.content
              }
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-3">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Stats Footer */}
            <div className="d-flex align-items-center gap-3 text-muted small">
              <span>
                <i className="bi bi-eye me-1"></i>
                {post.stats.views} vistas
              </span>
              <span>
                <i className="bi bi-chat-dots me-1"></i>
                {post.stats.replies} respuestas
              </span>
              <span className="badge bg-light text-dark border">
                <i className={`bi ${
                  post.categoryName === 'Consultas Académicas' ? 'bi-question-circle' :
                  post.categoryName === 'Recursos' ? 'bi-book' :
                  post.categoryName === 'Grupos de Estudio' ? 'bi-people' :
                  post.categoryName === 'Tutorías' ? 'bi-mortarboard' :
                  'bi-chat-dots'
                } me-1`}></i>
                {post.categoryName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPostCard;
