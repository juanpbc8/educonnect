import ReactGA from 'react-ga4';

/**
 * Track custom events in Google Analytics 4
 * @param {string} category - Event category (e.g., 'Tutorias', 'Resources', 'Forum')
 * @param {string} action - Event action (e.g., 'Contactar_Tutor', 'Download_Resource')
 * @param {string} label - Event label (e.g., tutor name, resource name)
 */
export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label
  });
};
