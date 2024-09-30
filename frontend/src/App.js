import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Pet from './pages/pet';

function App() {
  return (
    <Router>
      <div>
        <main>
      <Navbar />
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/pet" element={<Pet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;