const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['bed', 'toy', 'food bowl', 'leash', 'other'], // Kategoriler genişletilebilir
    required: true
  },
  condition: {
    type: String,
    enum: ['new', 'used'], // Eşyanın durumu
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ücretsiz ürünler için 0 olabilir
  },
  isAvailable: {
    type: Boolean,
    default: true // Eğer ürün satıldıysa ya da verilmişse, false yaparız
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Kullanıcı modeli ile ilişkilendiriyoruz
    required: true
  },
  photos: [
    {
      url: {
        type: String,
        required: true
      },
      altText: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Her güncellemede updatedAt alanını güncelle
itemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
