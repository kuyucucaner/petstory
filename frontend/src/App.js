import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import UpdatePetForm from "./components/update-pet-form";
import UpdateItemForm from "./components/update-item-form";
import UpdateProfileForm from "./components/update-profile-form";
import ResetPaswordForm from "./components/reset-password-form";
import ResetPaswordRequest from "./components/reset-password-request";
import CreatePet from "./components/create-pet-form";
import CreateItem from "./components/create-item-form";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Pet from "./pages/pet";
import Item from "./pages/item";
import Profile from "./pages/profile";
import PetDetail from "./pages/pet-detail";
import ItemDetail from "./pages/item-detail";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/scroll-bar.css';
function App() {
  return (
    <Router>
      <div>
        <main>
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
                 <Route
              path="/profile/:userId/update"
              element={
                <ProtectedRoute>
                  <UpdateProfileForm />
                </ProtectedRoute>
              }
            />
            <Route path="/pet" element={<Pet />} />
            <Route path="/create-pet" element={
                        <ProtectedRoute>
                      <CreatePet />
                      </ProtectedRoute>
             } />      
                <Route path="/create-item" element={
                        <ProtectedRoute>
                      <CreateItem />
                      </ProtectedRoute>
             } />
            <Route path="/item" element={<Item />} />
            <Route path="/reset-password-request" element={< ResetPaswordRequest />} />
            <Route path="/reset-password-form/:token" element={< ResetPaswordForm />} />
            <Route path="/pet/:petId" element={<PetDetail />} />
            <Route path="/item/:itemId" element={<ItemDetail />} />
            <Route path="/pet/:petId/update" element={<UpdatePetForm />} />
            <Route path="/item/:itemId/update" element={<UpdateItemForm />} />
            <Route path="/item/:itemId/update" element={<UpdateItemForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
