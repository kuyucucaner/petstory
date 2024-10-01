import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import UpdatePetForm from './components/update-pet-form';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import Pet from './pages/pet';
import PetDetail from './pages/pet-detail';

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
          <Route path="/pet/:petId" element={<PetDetail />} />
          <Route path="/pet/:petId/update" element={<UpdatePetForm />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;