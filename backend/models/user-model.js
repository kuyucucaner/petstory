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
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']  // Regex validation for email

  },
  password: {
    type: String,
    minlength: 6,
  },
  phone: {
    type: String,
    default: '',
    required: false,
    trim: true,
    sparse: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v); // Simple phone number validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
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
    street: { type: String, trim: true , default: ''},
    city: { type: String, trim: true, default: '' },
    state: { type: String, trim: true ,default: '' },
    country: { type: String, trim: true ,default: ''},
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
