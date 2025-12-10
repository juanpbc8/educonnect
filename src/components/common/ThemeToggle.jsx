import { useState, useEffect } from 'react';

/**
 * ThemeToggle Component
 * Implements Dark Mode toggle using Bootstrap 5.3's native data-bs-theme attribute
 * Persists user preference in localStorage for consistency across sessions
 */
function ThemeToggle() {
  // Initialize theme from localStorage, default to 'light'
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('educonnect_theme');
    return savedTheme || 'light';
  });

  // Apply theme to document root whenever it changes
  useEffect(() => {
    // Set data-bs-theme attribute on <html> element
    // Bootstrap 5.3+ automatically handles color scheme switching
    document.documentElement.setAttribute('data-bs-theme', theme);
    
    // Persist preference to localStorage
    localStorage.setItem('educonnect_theme', theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className="btn btn-outline-secondary"
      onClick={toggleTheme}
      title="Cambiar tema"
      aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
      style={{
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #dee2e6',
        transition: 'all 0.3s ease'
      }}
    >
      {theme === 'light' ? (
        // Moon icon for switching TO dark mode
        <i 
          className="bi bi-moon-stars-fill" 
          style={{ fontSize: '1.1rem' }}
          aria-hidden="true"
        ></i>
      ) : (
        // Sun icon for switching TO light mode
        <i 
          className="bi bi-sun-fill" 
          style={{ fontSize: '1.1rem' }}
          aria-hidden="true"
        ></i>
      )}
    </button>
  );
}

export default ThemeToggle;
