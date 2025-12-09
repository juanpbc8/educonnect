// Índice de Exportaciones de Componentes
// Este archivo sirve como referencia rápida de todos los componentes disponibles

// ============================================
// COMPONENTES COMUNES (common/)
// ============================================

/**
 * Navbar - Barra de navegación principal
 * Props:
 * - onShowAuthModal: function - Callback para mostrar modal de auth
 * - onShowUploadModal: function - Callback para mostrar modal de upload
 */
export { default as Navbar } from './common/Navbar';

/**
 * Footer - Pie de página con enlaces y newsletter
 * Props: ninguna
 */
export { default as Footer } from './common/Footer';

// ============================================
// COMPONENTES HOME (home/)
// ============================================

/**
 * HeroSection - Sección principal con búsqueda
 * Props:
 * - onSearch: function - Callback cuando se realiza una búsqueda
 */
export { default as HeroSection } from './home/HeroSection';

/**
 * FeaturesSection - Sección de características
 * Props: ninguna
 */
export { default as FeaturesSection } from './home/FeaturesSection';

/**
 * ResourcesPreview - Vista previa de recursos académicos
 * Props:
 * - resources: array - Array de recursos desde data.json
 */
export { default as ResourcesPreview } from './home/ResourcesPreview';

/**
 * PrototypesSection - Próximas funcionalidades
 * Props: ninguna
 */
export { default as PrototypesSection } from './home/PrototypesSection';

/**
 * TutorsSection - Tutores destacados
 * Props: ninguna
 */
export { default as TutorsSection } from './home/TutorsSection';

/**
 * ForumCTA - Call-to-action para el foro
 * Props: ninguna
 */
export { default as ForumCTA } from './home/ForumCTA';

// ============================================
// COMPONENTES UI (ui/)
// ============================================

/**
 * AuthModal - Modal de Login/Register
 * Props:
 * - show: boolean - Controla la visibilidad del modal
 * - onHide: function - Callback para cerrar el modal
 * 
 * Características:
 * - Toggle entre Login y Register sin cambiar de página
 * - Validación de contraseñas en registro
 * - Reset automático del formulario al cerrar
 */
export { default as AuthModal } from './ui/AuthModal';

/**
 * UploadModal - Modal para subir recursos
 * Props:
 * - show: boolean - Controla la visibilidad del modal
 * - onHide: function - Callback para cerrar el modal
 * - onUploadSuccess: function - Callback al subir recurso exitosamente
 * 
 * Características:
 * - Formulario completo con validaciones
 * - Selector de tipo de recurso
 * - Reset automático del formulario al cerrar
 */
export { default as UploadModal } from './ui/UploadModal';

// ============================================
// EJEMPLO DE USO EN PÁGINAS
// ============================================

/*
import { 
  Navbar, 
  Footer, 
  HeroSection, 
  AuthModal 
} from '../components';

function MyPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <Navbar onShowAuthModal={() => setShowAuth(true)} />
      <HeroSection onSearch={(q) => console.log(q)} />
      <Footer />
      <AuthModal show={showAuth} onHide={() => setShowAuth(false)} />
    </>
  );
}
*/
