const Pet = require('../models/pet-model');
const User = require('../models/user-model'); // Eğer kullanıcıya referans veriyorsan
const fs = require('fs');

// Evcil hayvan oluşturma
const PetController = {

    createPet : async function (req, res) {
      const { name, species, breed, age, gender, ownerId } = req.body;
      const photoPaths = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : []; // Fotoğraf yollarını düzelt

      try {
        // Kullanıcının olup olmadığını kontrol et
        const user = await User.findById(ownerId);
        if (!user) {
          return res.status(404).json({ message: 'Owner not found' });
          }
          console.log('Request Body: ', req.body);
        // Yeni evcil hayvan oluştur
        const newPet = new Pet({
          name,
          species,
          breed,
          age,
          gender,
          ownerId,
          photo: photoPaths // Dosya yollarını 'photo' dizisine ekle

        });
    
        const savedPet = await newPet.save();
        res.status(201).json(savedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error creating pet', error });
      }
    },
    
    // Tüm evcil hayvanları listeleme
    getAllPets : async function (req, res)  {
      try {
        const pets = await Pet.find().populate('ownerId', 'firstName lastName email'); // Sahip bilgilerini de çekiyoruz
        res.status(200).json(pets);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching pets', error });
      }
    },
    
    // Tek bir evcil hayvanı listeleme
    getPetById : async function  (req, res) {
      const { id } = req.params;
    
      try {
        const pet = await Pet.findById(id).populate('ownerId', 'firstName lastName email');
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
    
        res.status(200).json(pet);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching pet', error });
      }
    },

    getPetsBySpecies: async function (req, res) {
      const species = req.params.species;
    
      console.log(`Species received: ${species}`); // Kategori değerini kontrol et
    
      try {
        const pets = await Pet.find({ species: species });
    
        if (pets.length === 0) {
          return res.status(404).json({ message: 'No pets found for this species.' });
        }
    
        return res.status(200).json(pets);
      } catch (error) {
        console.error('Error fetching items:', error); // Hata mesajını konsola yazdır
        return res.status(500).json({ message: 'Server error.', error: error.message }); // Hata mesajını döndür
      }
    },
    getPetsByOwnerRole : async function (req, res){
      const { role } = req.params; // URL parametresinden role alınıyor
      try {
        const pets = await Pet.find()
          .populate({ path: 'ownerId', match: { role: role } })
          .exec();
    
        const filteredPets = pets.filter(pet => pet.ownerId !== null);
        res.status(200).json(filteredPets);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: `An error occurred while fetching pets for ${role} role` });
      }
    },
    // Evcil hayvan bilgilerini güncelleme
    updatePet : async  function (req, res)  {
      const { id } = req.params;
      const { name, species, breed, age, gender , isAdopted} = req.body;
      const photoPaths = req.files ? req.files.map(file => file.path.replace(/\\/g, '/')) : [];

      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
    
        // Evcil hayvan bilgilerini güncelle
        pet.name = name || pet.name;
        pet.species = species || pet.species;
        pet.breed = breed || pet.breed;
        pet.age = age || pet.age;
        pet.gender = gender || pet.gender;
        pet.updatedAt = Date.now();
        pet.isAdopted = isAdopted || pet.isAdopted;
        // Fotoğraf güncelleme işlemi
        if (photoPaths.length > 0) {
          // İlk fotoğrafı koruma ve yalnızca 5 fotoğraf limitine kadar fotoğraf ekleme
          let currentPhotos = pet.photo || [];
          
          // İlk fotoğraf sabit kalacak, yeni fotoğraflar mevcut diziye eklenmeli
          const maxPhotos = 5;
          if (currentPhotos.length >= maxPhotos) {
            return res.status(400).json({ message: 'Fotoğraf limiti dolu. Yeni fotoğraf eklemek için mevcut fotoğraflardan birini silin.' });
          }
    
          // Sadece ilk fotoğrafı koruyarak diğer boş alanlara yeni fotoğrafları ekleyin
          const existingPhotos = [currentPhotos[0], ...photoPaths.slice(0, maxPhotos - currentPhotos.length)];
          currentPhotos = [...existingPhotos, ...currentPhotos.slice(existingPhotos.length)];
          
          // Güncellenmiş fotoğraf dizisini ayarla
          pet.photo = currentPhotos.slice(0, maxPhotos); // 5 fotoğrafla sınırlı kalır
        }
        
        const updatedPet = await pet.save();
        console.log('Updated pet : ', updatedPet);
        res.status(200).json(updatedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error updating pet', error });
      }
    },
    
  // Evcil hayvanı silme
deletePet: async function (req, res) {
  const { id } = req.params;

  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error });
  }
},

    
    // Tıbbi kayıt ekleme
    addMedicalRecord : async  function (req, res)  {
      const { id } = req.params; // Evcil hayvanın ID'si
      const { visitDate, notes, vet } = req.body;
    
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
    
        // Yeni tıbbi kayıt ekle
        const newMedicalRecord = {
          visitDate: visitDate || Date.now(),
          notes,
          vet
        };
    
        pet.medicalRecords.push(newMedicalRecord);
        const updatedPet = await pet.save();
        res.status(201).json(updatedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error adding medical record', error });
      }
    },
    
// Tıbbi kayıt silme
deleteMedicalRecord: async function (req, res) {
  const { petId, recordId } = req.params; // Evcil hayvan ve kayıt ID'leri

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Tıbbi kaydı sil
    const initialLength = pet.medicalRecords.length;
    pet.medicalRecords = pet.medicalRecords.filter(record => record._id.toString() !== recordId);

    if (pet.medicalRecords.length === initialLength) {
      return res.status(404).json({ message: 'Medical record not found' });
    }

    const updatedPet = await pet.save();

    res.status(200).json(updatedPet); // 204 No Content yerine 200 OK kullanıldı, çünkü silinen kayıtları döndürüyoruz.
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medical record', error });
  }
},
 searchPets : async function (searchQuery) {
  const regex = new RegExp(searchQuery, 'i');
  const petResults = await Pet.find({
    $or: [
      { name: regex },
      { species: regex },
      { breed: regex },
    ]
  });
  return petResults;
},

getPetSearchResults: async function (req, res) {
  const { query } = req.query;
  try {
      const petResults = await PetController.searchPets(query);
      console.log("Pet Results : ", petResults);
      res.status(200).json(petResults);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for pets' });
  }
}

};

module.exports = PetController;


