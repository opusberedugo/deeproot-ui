import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/index';
import LoginPage from './pages/loginPage';
import NotFound from './pages/NotFound'; // Create this component
import HomePage from './pages/app/HomePage';
import ChatPage from './pages/app/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Index />} /> {/* Render Index for all routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} /> {/* 404 Route */}
        <Route path="/app" element={<ChatPage />} /> {/* App Landing Page */}
      </Routes>
    </Router>
  );
}

export default App;