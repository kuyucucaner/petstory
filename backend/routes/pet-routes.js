const express = require('express');
const router = express.Router();
const PetController = require('../controllers/pet-controller');
const upload = require('../config/multer'); // multer.js dosyasından import edin

/**
 * @swagger
 * components:
 *   schemas:
 *     PetSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Pet's name
 *         species:
 *           type: string
 *           description: Pet's species
 *         breed:
 *           type: string
 *           description: Pet's breed
 *         age:
 *           type: number
 *           description: Pet's age
 *         gender:
 *           type: string
 *           description: Pet's gender
 *         ownerId:
 *           type: string
 *           description: ID of the pet's owner
 *         medicalRecords:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               visitDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *               vet:
 *                 type: string
 *           description: Medical records for the pet
 *         isAdopted:
 *           type: boolean
 *           description: Adoption status of the pet
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Pet
 *     description: API for managing pets
 */

/**
 * @swagger
 * /api/v1/pet/create:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetSchema'
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Error creating pet
 */

/**
 * @swagger
 * /api/v1/pet:
 *   get:
 *     summary: Get all pets
 *     tags: [Pet]
 *     responses:
 *       200:
 *         description: A list of all pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PetSchema'
 *       500:
 *         description: Error fetching pets
 */

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   get:
 *     summary: Get a single pet by ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: A single pet's data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PetSchema'
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Error fetching pet
 */

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   put:
 *     summary: Update a pet by ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetSchema'
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Error updating pet
 */

/**
 * @swagger
 * /api/v1/pet/{id}:
 *   delete:
 *     summary: Delete a pet by ID
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Error deleting pet
 */


/**
 * @swagger
 * /api/v1/pet/{id}/medical-records:
 *   post:
 *     summary: Add a medical record to a pet
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitDate:
 *                 type: string
 *                 format: date-time
 *               notes:
 *                 type: string
 *               vet:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record added successfully
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Error adding medical record
 */

/**
 * @swagger
 * /api/v1/pet/{petId}/medical-records/{recordId}:
 *   delete:
 *     summary: Delete a medical record from a pet
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *       - in: path
 *         name: recordId
 *         schema:
 *           type: string
 *         required: true
 *         description: The medical record ID
 *     responses:
 *       200:
 *         description: Medical record deleted successfully
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Error deleting medical record
 */
/**
 * @swagger
 * /api/v1/pet/species/{species}:
 *   get:
 *     summary: Get pets by species
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: species
 *         required: true
 *         description: The species of the pets to retrieve
 *         schema:
 *           type: string
 *           enum: [dog, cat, bird, rabbit, other]
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       404:
 *         description: No pet found for this species
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/pet/owner/{role}:
 *   get:
 *     summary: Get pets by role
 *     tags: [Pet]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Role for pets
 *         schema:
 *           type: string
 *           enum: [vet, owner]
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       404:
 *         description: No pet found for this role
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/pet/search:
 *   get:
 *     summary: "Search pets by name, species, breed, or age"
 *     tags: [Pet]
 *     description: "Searches for pets based on a query string that matches name, species, breed, or age."
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: "The search term for finding pets."
 *     responses:
 *       200:
 *         description: "List of pets matching the search query"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       500:
 *         description: "An error occurred while searching for pets"
 */


router.get('/search', PetController.getPetSearchResults);
// Pet oluşturma
router.post('/create', upload.array('photo', 5), PetController.createPet);

// Tüm petleri listeleme
router.get('/', PetController.getAllPets);

// Pet'i ID'ye göre getirme
router.get('/:id', PetController.getPetById);

router.get('/species/:species', PetController.getPetsBySpecies);

router.get('/owner/:role', PetController.getPetsByOwnerRole);

// Pet'i güncelleme
router.put('/:id', upload.array('photo', 5), PetController.updatePet);

// Pet'i silme
router.delete('/:id', PetController.deletePet);

// Tıbbi kayıt ekleme
router.post('/:id/medical-records', PetController.addMedicalRecord);

// Tıbbi kayıt silme
router.delete('/:petId/medical-records/:recordId', PetController.deleteMedicalRecord);

module.exports = router;
