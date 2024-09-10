const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'rabbit', 'other'], // Türler, istediğin gibi genişletebilirsin
    default: 'other'
  },
  breed: {
    type: String,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown'], // Cinsiyet
    default: 'unknown'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Sahip bilgisi
    ref: 'User', // Eğer kullanıcı modelin varsa bu şekilde referanslayabilirsin
    required: true
  },
  medicalRecords: [
    {
      visitDate: {
        type: Date,
        default: Date.now
      },
      notes: {
        type: String,
        trim: true
      },
      vet: {
        type: String,
        trim: true
      }
    }
  ],
  isAdopted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
});

petSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
