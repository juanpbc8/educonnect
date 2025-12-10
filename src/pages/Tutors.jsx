import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import TutorFilters from '../components/tutors/TutorFilters';
import TutorCard from '../components/tutors/TutorCard';
import ContactModal from '../components/tutors/ContactModal';
import tutorsData from '../assets/data.json';

function Tutors() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState({
    subject: searchParams.get('subject') || '',
    university: searchParams.get('university') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minRating: searchParams.get('minRating') || '',
    modality: searchParams.get('modality') || ''
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const tutors = useMemo(() => tutorsData.tutores || [], []);

  // Extract unique values for filters
  const subjects = useMemo(() => {
    const allSubjects = tutors.flatMap(t => t.subjects);
    return [...new Set(allSubjects)].sort();
  }, [tutors]);

  const universities = useMemo(() => {
    const allUnis = tutors.map(t => t.university);
    return [...new Set(allUnis)].sort();
  }, [tutors]);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(filterName, value);
    } else {
      params.delete(filterName);
    }
    setSearchParams(params);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      subject: '',
      university: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      modality: ''
    });
    setSearchQuery('');
    setSearchParams({});
  };

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  // Filter tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter(tutor => {
      // Subject filter
      if (filters.subject && tutor.subjects && !tutor.subjects.includes(filters.subject)) {
        return false;
      }

      // University filter
      if (filters.university && tutor.university !== filters.university) {
        return false;
      }

      // Min price filter
      if (filters.minPrice && tutor.pricePerHour < parseFloat(filters.minPrice)) {
        return false;
      }

      // Max price filter
      if (filters.maxPrice && tutor.pricePerHour > parseFloat(filters.maxPrice)) {
        return false;
      }

      // Min rating filter
      if (filters.minRating && tutor.rating < parseFloat(filters.minRating)) {
        return false;
      }

      // Modality filter
      if (filters.modality && tutor.modality && !tutor.modality.includes(filters.modality)) {
        return false;
      }

      // Search query (search in name, bio, specialty, subjects)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          tutor.fullName || '',
          tutor.bio || '',
          tutor.specialty || '',
          ...(tutor.subjects || [])
        ].join(' ').toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [tutors, filters, searchQuery]);

  // Handle contact tutor
  const handleContactTutor = (tutor) => {
    setSelectedTutor(tutor);
    setShowContactModal(true);
  };

  return (
    <div className="tutors-page">
      {/* Header */}
      <div className="tutors-header py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-5 fw-bold mb-3">
                <i className="bi bi-person-video3 me-3 text-primary"></i>
                Encuentra tu Tutor Ideal
              </h1>
              <p className="lead text-muted mb-4">
                Conecta con estudiantes, egresados y profesores de las mejores universidades del Perú
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="badge bg-primary text-white fs-5 p-3">
                {filteredTutors.length} Tutores Disponibles
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="row mt-4">
            <div className="col-12">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Busca por nombre, materia, especialidad..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setSearchQuery('');
                      const params = new URLSearchParams(searchParams);
                      params.delete('search');
                      setSearchParams(params);
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Sidebar - Filters */}
          <div className="col-lg-3">
            <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <TutorFilters
                  subjects={subjects}
                  universities={universities}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>

          {/* Main - Tutor Cards */}
          <div className="col-lg-9">
            {/* Results Info */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">
                {searchQuery || Object.values(filters).some(v => v) ? (
                  <>
                    <i className="bi bi-funnel-fill me-2 text-primary"></i>
                    Resultados filtrados: {filteredTutors.length}
                  </>
                ) : (
                  <>
                    <i className="bi bi-people-fill me-2 text-primary"></i>
                    Todos los tutores: {filteredTutors.length}
                  </>
                )}
              </h5>

              {/* Sort Options (future enhancement) */}
              {/* <div className="btn-group" role="group">
                <button className="btn btn-sm btn-outline-secondary active">Destacados</button>
                <button className="btn btn-sm btn-outline-secondary">Precio: Menor a Mayor</button>
                <button className="btn btn-sm btn-outline-secondary">Mejor Valorados</button>
              </div> */}
            </div>

            {/* Tutors Grid */}
            {filteredTutors.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredTutors.map((tutor, index) => (
                  <div key={tutor.id} className="col">
                    <TutorCard 
                      tutor={tutor} 
                      onContact={handleContactTutor}
                      isPromoted={index < 2}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h4 className="text-muted mb-3">No se encontraron tutores</h4>
                <p className="text-muted mb-4">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={handleClearFilters}
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        show={showContactModal}
        onHide={() => setShowContactModal(false)}
        tutor={selectedTutor}
      />
    </div>
  );
}

export default Tutors;
