import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/index';
import LoginPage from './pages/loginPage';
import NotFound from './pages/NotFound'; // Create this component
import HomePage from './pages/app/HomePage';
import ChatPage from './pages/app/ChatPage';
import Dashboard from './pages/app/Dashboard';
import Inventory from './pages/app/Inventory';
import {InventoryProvider} from './context/InventoryContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Index />} /> {/* Render Index for all routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFound />} /> {/* 404 Route */}
        <Route path="/app/chat" element={<ChatPage />} /> {/* App Landing Page */}
        <Route path="/app/inventory" 
          element={
            <InventoryProvider>
              <Inventory />
            </InventoryProvider>
          } /> {/* App Landing Page */}
        <Route path="/app/" 
          element={
            <InventoryProvider>
              <Dashboard />
            </InventoryProvider>
          } /> {/* Dashboard Landing Page */}
      </Routes>
    </Router>
  );
}

export default App;