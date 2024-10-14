import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protected-route";
import UpdatePetForm from "./components/update-pet-form";
import UpdateItemForm from "./components/update-item-form";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Pet from "./pages/pet";
import Item from "./pages/item";
import Profile from "./pages/profile";
import PetDetail from "./pages/pet-detail";
import ItemDetail from "./pages/item-detail";

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
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/pet" element={<Pet />} />
            <Route path="/item" element={<Item />} />
            <Route path="/pet/:petId" element={<PetDetail />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route path="/pet/:petId/update" element={<UpdatePetForm />} />
            <Route path="/item/:itemId/update" element={<UpdateItemForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
