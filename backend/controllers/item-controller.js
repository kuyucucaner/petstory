const Item = require('../models/item-model');
const User = require('../models/user-model');

const ItemController = {
    // 1. Yeni bir eşya ekleme (Create)
    createItem : async function (req, res) {
      const { name, description, category, condition, price, owner, photos } = req.body;
    
      try {
        // Kullanıcının olup olmadığını kontrol et
        const user = await User.findById(owner);
        if (!user) {
          return res.status(404).json({ message: 'Owner not found' });
        }
    
        // Yeni eşya oluştur
        const newItem = new Item({
          name,
          description,
          category,
          condition,
          price,
          owner,
          photos
        });
    
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
      }
    },
    
    // 2. Tüm eşyaları listeleme (Read All)
    getAllItems : async function (req, res) {
      try {
        const items = await Item.find().populate('owner', 'firstName lastName email'); // Sahip bilgilerini de ekleyerek çekiyoruz
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
      }
    },
    
    // 3. Belirli bir eşyayı listeleme (Read One)
    getItemById : async function (req, res) {
      const { id } = req.params;
    
      try {
        const item = await Item.findById(id).populate('owner', 'firstName lastName email');
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
      }
    },
    
    // 4. Eşyayı güncelleme (Update)
    updateItem : async function (req, res) {
      const { id } = req.params;
      const { name, description, category, condition, price, isAvailable, photos } = req.body;
    
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        // Eşya bilgilerini güncelle
        item.name = name || item.name;
        item.description = description || item.description;
        item.category = category || item.category;
        item.condition = condition || item.condition;
        item.price = price || item.price;
        item.isAvailable = typeof isAvailable !== 'undefined' ? isAvailable : item.isAvailable;
        item.photos = photos || item.photos;
        item.updatedAt = Date.now();
    
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
      }
    },
    
    // 5. Eşyayı silme (Delete)
    deleteItem : async function (req, res) {
      const { id } = req.params;
    
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        await item.remove();
        res.status(200).json({ message: 'Item deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
      }
    },
    
    // 6. Fotoğraf ekleme (Add Photo)
    addPhoto : async function (req, res) {
      const { id } = req.params;
      const { url, altText } = req.body;
    
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        // Yeni fotoğraf ekle
        item.photos.push({ url, altText });
        const updatedItem = await item.save();
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error adding photo', error });
      }
    },
    
    // 7. Fotoğraf silme (Delete Photo)
    deletePhoto : async function (req, res) {
      const { id, photoId } = req.params;
    
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
    
        // Fotoğrafı sil
        item.photos = item.photos.filter(photo => photo._id.toString() !== photoId);
        const updatedItem = await item.save();
    
        res.status(200).json(updatedItem);
      } catch (error) {
        res.status(500).json({ message: 'Error deleting photo', error });
      }
    },
};

module.exports = ItemController;