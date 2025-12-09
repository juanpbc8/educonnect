import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import AuthModal from '../components/ui/AuthModal';
import UploadModal from '../components/ui/UploadModal';

/**
 * MainLayout Component
 * Global layout wrapper for all public pages
 * Provides consistent Navbar and Footer across the application
 * Manages global modals (Auth and Upload)
 */
function MainLayout() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Auth Modal handlers
  const handleShowAuthModal = () => {
    setShowAuthModal(true);
    document.body.classList.add('modal-open');
    
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'auth-backdrop';
    document.body.appendChild(backdrop);
  };

  const handleHideAuthModal = () => {
    setShowAuthModal(false);
    document.body.classList.remove('modal-open');
    
    const backdrop = document.getElementById('auth-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  };

  // Upload Modal handlers
  const handleShowUploadModal = () => {
    setShowUploadModal(true);
    document.body.classList.add('modal-open');
    
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'upload-backdrop';
    document.body.appendChild(backdrop);
  };

  const handleHideUploadModal = () => {
    setShowUploadModal(false);
    document.body.classList.remove('modal-open');
    
    const backdrop = document.getElementById('upload-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  };

  const handleUploadSuccess = (newResource) => {
    console.log('Recurso subido:', newResource);
    // En producción: actualizar estado global, revalidar cache, etc.
  };

  return (
    <>
      <Navbar 
        onShowAuthModal={handleShowAuthModal}
        onShowUploadModal={handleShowUploadModal}
      />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* Global Modals */}
      <AuthModal 
        show={showAuthModal} 
        onHide={handleHideAuthModal} 
      />
      <UploadModal 
        show={showUploadModal} 
        onHide={handleHideUploadModal}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
}

export default MainLayout;
