import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Tutors from './pages/Tutors';
import Forum from './pages/Forum';
import ReactGA from 'react-ga4';

function App() {
  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recursos" element={<Resources />} />
          <Route path="/tutorias" element={<Tutors />} />
          <Route path="/foro" element={<Forum />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Component to track page views automatically
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Send pageview hit to GA4 on route change
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
  }, [location.pathname, location.search]);

  return null;
}

export default App;
