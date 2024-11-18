const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
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
 *                 description: Date of the medical visit
 *               notes:
 *                 type: string
 *                 description: Notes from the medical visit
 *               vet:
 *                 type: string
 *                 description: Veterinarian's name
 *           description: Medical records for the pet
 *         isAdopted:
 *           type: boolean
 *           description: Adoption status of the pet
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 * 
 *     Item:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Item's name
 *         description:
 *           type: string
 *           description: Item's description
 *         category:
 *           type: string
 *           description: Item's category
 *         condition:
 *           type: string
 *           description: Item's condition (e.g., new, used)
 *         price:
 *           type: number
 *           description: Price of the item
 *         owner:
 *           type: string
 *           description: ID of the item's owner
 *         photos:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: URL of the photo
 *               altText:
 *                 type: string
 *                 description: Alternative text for the photo
 *           description: Photos of the item
 *         isAvailable:
 *           type: boolean
 *           description: Availability status of the item
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * tags:
 *   - name: Search
 *     description: API for managing search results
 */

/**
 * @swagger
 * /api/v1/search/search-datas:
 *   get:
 *     summary: Search for items, users, and pets in the database
 *     tags: [Search]
 *     description: Searches across items, users, and pets in the database based on the query parameter.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term to find matching records.
 *     responses:
 *       200:
 *         description: List of search results across items, users, and pets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: User schema (add reference here if available)
 *                 pets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Query parameter is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Query parameter is required"
 *       500:
 *         description: An error occurred while searching
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while searching for all"
 */

router.get('/search-datas', SearchController.getAllSearchResults);

module.exports = router;
