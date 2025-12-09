import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ResourcesPreview from '../components/home/ResourcesPreview';
import PrototypesSection from '../components/home/PrototypesSection';
import TutorsSection from '../components/home/TutorsSection';
import ForumCTA from '../components/home/ForumCTA';
import data from '../assets/data.json';

function Home() {
  const navigate = useNavigate();

  // Obtener recursos del JSON
  const resources = data.recursos || [];

  // Handler para búsqueda
  const handleSearch = (query) => {
    // Navegar a la página de recursos con el query
    navigate(`/recursos?search=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <HeroSection onSearch={handleSearch} />
      <FeaturesSection />
      <ResourcesPreview resources={resources} />
      <PrototypesSection />
      <TutorsSection />
      <ForumCTA />
    </>
  );
}

export default Home;
