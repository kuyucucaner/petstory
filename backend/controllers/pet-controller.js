const Pet = require('../models/pet-model');
const User = require('../models/user-model'); // Eğer kullanıcıya referans veriyorsan

// Evcil hayvan oluşturma
const PetController = {

    createPet : async function (req, res) {
      const { name, species, breed, age, gender, ownerId } = req.body;
    
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
          ownerId
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
    
    // Evcil hayvan bilgilerini güncelleme
    updatePet : async  function (req, res)  {
      const { id } = req.params;
      const { name, species, breed, age, gender } = req.body;
    
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
    
        const updatedPet = await pet.save();
        res.status(200).json(updatedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error updating pet', error });
      }
    },
    
    // Evcil hayvanı silme
    deletePet : async  function (req, res)  {
      const { id } = req.params;
    
      try {
        const pet = await Pet.findById(id);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
    
        await pet.remove();
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
        res.status(200).json(updatedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error adding medical record', error });
      }
    },
    
    // Tıbbi kayıt silme
    deleteMedicalRecord : async  function (req, res)  {
      const { petId, recordId } = req.params; // Evcil hayvan ve kayıt ID'leri
    
      try {
        const pet = await Pet.findById(petId);
        if (!pet) {
          return res.status(404).json({ message: 'Pet not found' });
        }
    
        // Tıbbi kaydı sil
        pet.medicalRecords = pet.medicalRecords.filter(record => record._id.toString() !== recordId);
        const updatedPet = await pet.save();
    
        res.status(200).json(updatedPet);
      } catch (error) {
        res.status(500).json({ message: 'Error deleting medical record', error });
      }
    },
};

module.exports = PetController;


