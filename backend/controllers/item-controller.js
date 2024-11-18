const Item = require("../models/item-model");
const User = require("../models/user-model");
const fs = require("fs");

const ItemController = {
  // 1. Yeni bir eşya ekleme (Create)
  createItem: async function (req, res) {
    const { name, description, category, condition, price, owner } = req.body;

    // Fotoğrafların dosya yolunu almak için req.files kullanıyoruz
    const photoPaths = req.files
      ? req.files.map((file) => file.path.replace(/\\/g, "/"))
      : []; // Fotoğraf yollarını düzelt

    try {
      // Kullanıcının olup olmadığını kontrol et
      const user = await User.findById(owner);
      if (!user) {
        return res.status(404).json({ message: "Owner not found" });
      }

      // Yeni eşya oluştur
      const newItem = new Item({
        name,
        description,
        category,
        condition,
        price,
        owner,
        photo: photoPaths, // Dosya yollarını 'photo' dizisine ekle
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(500).json({ message: "Error creating item", error });
    }
  },

  // 2. Tüm eşyaları listeleme (Read All)
  getAllItems: async function (req, res) {
    try {
      const items = await Item.find().populate(
        "owner",
        "firstName lastName email"
      ); // Sahip bilgilerini de ekleyerek çekiyoruz
      console.log("items : ", items);
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  },

  // 3. Belirli bir eşyayı listeleme (Read One)
  getItemById: async function (req, res) {
    const { id } = req.params;

    try {
      const item = await Item.findById(id).populate(
        "owner",
        "firstName lastName email"
      );
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error });
    }
  },
  getItemsByCategory: async function (req, res) {
    const category = req.params.category;
  
    console.log(`Category received: ${category}`); // Kategori değerini kontrol et
  
    try {
      const items = await Item.find({ category: category });
  
      if (items.length === 0) {
        return res.status(404).json({ message: 'No items found for this category.' });
      }
  
      return res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching items:', error); // Hata mesajını konsola yazdır
      return res.status(500).json({ message: 'Server error.', error: error.message }); // Hata mesajını döndür
    }
  },
  getItemsByOwnerRole : async function (req, res){
    const { role } = req.params; // URL parametresinden role alınıyor
    try {
      const items = await Item.find()
        .populate({ path: 'owner', match: { role: role } })
        .exec();
  
      const filteredItems = items.filter(item => item.owner !== null);
      res.status(200).json(filteredItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: `An error occurred while fetching items for ${role} role` });
    }
  },
  updateItem: async function (req, res) {
    const { id } = req.params;
    const { name, description, category, condition, price } = req.body;
    const photoPaths = req.files
      ? req.files.map((file) => file.path.replace(/\\/g, "/"))
      : [];

    try {
      // İlgili öğeyi bul
      const item = await Item.findById(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      // Eşya bilgilerini güncelle
      item.name = name || item.name;
      item.description = description || item.description;
      item.category = category || item.category;
      item.condition = condition || item.condition;
      item.price = price || item.price;

      // Fotoğraf güncelleme işlemi
      if (photoPaths.length > 0) {
        // İlk fotoğrafı koruma ve yalnızca 5 fotoğraf limitine kadar fotoğraf ekleme
        let currentPhotos = item.photo || [];

        // İlk fotoğraf sabit kalacak, yeni fotoğraflar mevcut diziye eklenmeli
        const maxPhotos = 5;
        if (currentPhotos.length >= maxPhotos) {
          return res
            .status(400)
            .json({
              message:
                "Fotoğraf limiti dolu. Yeni fotoğraf eklemek için mevcut fotoğraflardan birini silin.",
            });
        }

        // Sadece ilk fotoğrafı koruyarak diğer boş alanlara yeni fotoğrafları ekleyin
        const existingPhotos = [
          currentPhotos[0],
          ...photoPaths.slice(0, maxPhotos - currentPhotos.length),
        ];
        currentPhotos = [
          ...existingPhotos,
          ...currentPhotos.slice(existingPhotos.length),
        ];

        // Güncellenmiş fotoğraf dizisini ayarla
        item.photo = currentPhotos.slice(0, maxPhotos); // 5 fotoğrafla sınırlı kalır
      }

      const updatedItem = await item.save();
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error("Error updating item:", error);
      res
        .status(500)
        .json({ message: "Error updating item", error: error.message });
    }
  },

  // 5. Eşyayı silme (Delete)
  deleteItem: async function (req, res) {
    const { id } = req.params;

    try {
      const item = await Item.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  },
  searchItems : async function (filters) {
    const query = {};
    if (filters.name) {
      query.name = new RegExp(filters.name, 'i');
    }
    if (filters.description) {
      query.description = new RegExp(filters.description, 'i');
    }
    if (filters.category) {
      query.category = new RegExp(filters.category, 'i');
    }
    if (filters.condition) {
      query.condition = new RegExp(filters.condition, 'i');
    }
    const itemResults = await Item.find(query);
    return itemResults;
  },
  
  getItemSearchResults: async function (req, res) {
    const filters = req.query;
    try {
        const itemResults = await ItemController.searchItems(filters);
        console.log("Item Results : ", itemResults);
        res.status(200).json(itemResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for items' });
    }
  }
  
};

module.exports = ItemController;
