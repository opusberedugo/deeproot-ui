import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/index';
import LoginPage from './pages/loginPage';
import NotFound from './pages/NotFound'; // Create this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Index />} /> {/* Render Index for all routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
}

export default App;