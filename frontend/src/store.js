// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth-slice';
import petReducer from './features/pet/pet-slice';
import itemReducer from './features/item/item-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pet: petReducer,  
    item: itemReducer,  
  },
});

// Eğer token varsa isAuthenticated olarak ayarla
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({
    type: 'auth/registerUser/fulfilled',
    payload: { token },
  });
}

export default store;
