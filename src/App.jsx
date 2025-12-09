import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Tutors from './pages/Tutors';
import Forum from './pages/Forum';

function App() {
  return (
    <Router>
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

export default App;
