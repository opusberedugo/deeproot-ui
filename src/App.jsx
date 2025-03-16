// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import './App.css'
import Index from './pages/index'
import LoginPage from './pages/loginPage'
function App() {
  // const [count, setCount] = useState(0)

  return (
      <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" element={<Index />} />

        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    
  )
}

export default App
