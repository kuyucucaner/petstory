const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: false,
    sparse: true // Google ile giriş yapanlar için optional

  },
  firstName: {
    type: String,
    required: false,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6,
  },
  phone: {
    type: String,
    default: '',
    required: false,
    unique: true, // Artık unique değil
    trim: true,
    sparse: true, // Telefon numarası olan kullanıcılar için indeksleme yap
  },
  
  role: {
    type: String,
    enum: ['user', 'admin' , 'vet' , 'owner'],
    default: 'user'
  },
  photo: {
    type: String, 
    default: 'default.jpg'
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  dateOfBirth: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDelete :{
    type:Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
  // Eğer şifre değişmemişse ya da yeni bir şifre yoksa işlemi atla
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});



userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
