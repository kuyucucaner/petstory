const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  password: { type: String, minlength: 6 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  phone: {
    type: String,
    trim: true,
    sparse: true,
    validate: {
      validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  role: { type: String, enum: ["user", "admin", "vet", "owner"], default: "user" },
  photo: { type: String, default: "default.jpg" },
  address: {
    street: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    state: { type: String, trim: true, default: "" },
    country: { type: String, trim: true, default: "" },
  },
  dateOfBirth: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isDelete: { type: Boolean, default: false },
});

// Şifre Hashleme
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// `updatedAt` Güncellemesi
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Şifre Kontrolü
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
