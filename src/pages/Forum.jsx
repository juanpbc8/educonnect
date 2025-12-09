import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ForumSidebar from '../components/forum/ForumSidebar';
import ForumPostCard from '../components/forum/ForumPostCard';
import CreatePostModal from '../components/forum/CreatePostModal';
import rawData from '../assets/data.json';

/**
 * Forum Page Component
 * Main page for the community forum with filtering, search, and sorting
 */
function Forum() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  // State management
  const [posts, setPosts] = useState(rawData.foro_posts);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, unanswered
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);

  const categories = rawData.categorias_foro;

  // Calculate post counts per category
  const postCounts = categories.reduce((acc, category) => {
    acc[category.id] = posts.filter(post => post.categoryId === category.id).length;
    return acc;
  }, {});

  // Filter posts by category and search query
  const filteredPosts = posts.filter(post => {
    // Category filter
    if (selectedCategory !== null && post.categoryId !== selectedCategory) {
      return false;
    }

    // Search filter (search in title, content, tags, author)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        post.title.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.authorName.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (post.materia && post.materia.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;
    }

    return true;
  });

  // Sort filtered posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        // Sort by likes (descending)
        return b.stats.likes - a.stats.likes;
      
      case 'unanswered':
        // Sort by replies (ascending), then by date (descending)
        if (a.stats.replies !== b.stats.replies) {
          return a.stats.replies - b.stats.replies;
        }
        return new Date(b.date) - new Date(a.date);
      
      case 'recent':
      default:
        // Sort by date (descending)
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Update URL params
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  // Handle new post creation
  const handlePostCreate = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreateModal(false);
  };

  // Handle post card click (open detail modal)
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  return (
    <div className="forum-page">
      {/* Forum Header */}
      <section className="forum-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Foro Comunitario</h1>
              <p className="lead">
                Comparte conocimientos, resuelve dudas y conecta con otros estudiantes universitarios
              </p>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-4">
                      <h3 className="fw-bold mb-0">{posts.length}</h3>
                      <small className="text-muted">Temas</small>
                    </div>
                    <div className="col-4">
                      <h3 className="fw-bold mb-0">
                        {posts.reduce((sum, post) => sum + post.stats.replies, 0)}
                      </h3>
                      <small className="text-muted">Respuestas</small>
                    </div>
                    <div className="col-4">
                      <h3 className="fw-bold mb-0">
                        {posts.filter(post => post.status === 'open').length}
                      </h3>
                      <small className="text-muted">Activos</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSearch} className="row align-items-center g-3">
                <div className="col-lg-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Buscar temas, preguntas, o etiquetas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchParams({});
                        }}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 text-end">
                  <div className="btn-group">
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'recent' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSortChange('recent')}
                    >
                      <i className="bi bi-clock me-1"></i>
                      Recientes
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'popular' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSortChange('popular')}
                    >
                      <i className="bi bi-fire me-1"></i>
                      Populares
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${sortBy === 'unanswered' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => handleSortChange('unanswered')}
                    >
                      <i className="bi bi-question-circle me-1"></i>
                      Sin respuesta
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 mb-4">
              <ForumSidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
                onNewTopicClick={() => setShowCreateModal(true)}
                postCounts={postCounts}
              />
            </div>

            {/* Posts List */}
            <div className="col-lg-9">
              {/* Results Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">
                  {selectedCategory 
                    ? categories.find(cat => cat.id === selectedCategory)?.nombre 
                    : 'Todos los Temas'
                  }
                  <span className="badge bg-light text-dark ms-2">
                    {sortedPosts.length}
                  </span>
                </h5>
                {searchQuery && (
                  <div className="text-muted small">
                    Resultados para: <strong>"{searchQuery}"</strong>
                  </div>
                )}
              </div>

              {/* Posts Grid */}
              {sortedPosts.length === 0 ? (
                <div className="card border-0 shadow-sm text-center py-5">
                  <div className="card-body">
                    <i className="bi bi-inbox display-1 text-muted mb-3"></i>
                    <h5 className="text-muted">No se encontraron temas</h5>
                    <p className="text-muted mb-4">
                      {searchQuery 
                        ? 'Intenta con otros términos de búsqueda' 
                        : 'Sé el primero en crear un tema en esta categoría'
                      }
                    </p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowCreateModal(true)}
                    >
                      <i className="bi bi-plus-circle me-2"></i>
                      Crear Nuevo Tema
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {sortedPosts.map(post => (
                    <ForumPostCard
                      key={post.id}
                      post={post}
                      onClick={() => handlePostClick(post)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination (optional - for future implementation) */}
              {sortedPosts.length > 10 && (
                <nav className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <span className="page-link">Anterior</span>
                    </li>
                    <li className="page-item active">
                      <span className="page-link">1</span>
                    </li>
                    <li className="page-item">
                      <button className="page-link">2</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">3</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">Siguiente</button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      <CreatePostModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onPostCreate={handlePostCreate}
        categories={categories}
        existingPosts={posts}
      />

      {/* Post Detail Modal (simplified version) */}
      {showPostDetail && selectedPost && (
        <>
          <div 
            className="modal-backdrop fade show" 
            onClick={() => setShowPostDetail(false)}
          ></div>
          <div 
            className="modal fade show" 
            style={{ display: 'block' }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedPost.title}</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowPostDetail(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="flex-grow-1">
                        <strong>{selectedPost.authorName}</strong>
                        <div className="text-muted small">
                          {selectedPost.universidadSigla} - {selectedPost.carrera}
                        </div>
                      </div>
                      <span className={`status-badge ${selectedPost.status === 'open' ? 'abierto' : 'resuelto'}`}>
                        {selectedPost.status === 'open' ? 'Abierto' : 'Resuelto'}
                      </span>
                    </div>
                    <p>{selectedPost.content}</p>
                    <div className="d-flex gap-2 mb-3">
                      {selectedPost.tags.map((tag, idx) => (
                        <span key={idx} className="tag-chip">#{tag}</span>
                      ))}
                    </div>
                    <div className="text-muted small">
                      <i className="bi bi-eye me-1"></i> {selectedPost.stats.views} vistas
                      <span className="mx-2">•</span>
                      <i className="bi bi-heart me-1"></i> {selectedPost.stats.likes} likes
                    </div>
                  </div>

                  <hr />

                  <h6 className="fw-semibold mb-3">
                    Respuestas ({selectedPost.replies?.length || 0})
                  </h6>
                  
                  {selectedPost.replies && selectedPost.replies.length > 0 ? (
                    selectedPost.replies.map(reply => (
                      <div key={reply.id} className="response-card">
                        <div className="d-flex justify-content-between mb-2">
                          <strong>{reply.authorName}</strong>
                          <small className="text-muted">
                            {new Date(reply.date).toLocaleDateString('es-PE')}
                          </small>
                        </div>
                        <p className="mb-2">{reply.content}</p>
                        <div className="text-muted small">
                          <i className="bi bi-heart me-1"></i> {reply.likes} likes
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted text-center py-4">
                      Aún no hay respuestas. ¡Sé el primero en responder!
                    </p>
                  )}

                  {/* Response Form */}
                  <div className="mt-4">
                    <h6 className="fw-semibold mb-3">Tu Respuesta</h6>
                    <textarea
                      className="form-control mb-3"
                      rows="4"
                      placeholder="Escribe tu respuesta aquí..."
                    ></textarea>
                    <button className="btn btn-primary">
                      <i className="bi bi-send me-2"></i>
                      Enviar Respuesta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Forum;
