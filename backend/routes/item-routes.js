const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item-controller');
/**
 * @swagger
 * components:
 *   schemas:
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
 *           description: Item's condition (new, used, etc.)
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
 *               altText:
 *                 type: string
 *           description: Photos of the item
 *         isAvailable:
 *           type: boolean
 *           description: Availability status of the item
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
 *   - name: Item
 *     description: API for managing items
 */

/**
 * @swagger
 * /api/v1/item/create:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *       404:
 *         description: Owner not found
 *       500:
 *         description: Error creating item
 */

/**
 * @swagger
 * /api/v1/item:
 *   get:
 *     summary: Get all items
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: A list of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Error fetching items
 */

/**
 * @swagger
 * /api/v1/item/{id}:
 *   get:
 *     summary: Get a single item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: A single item's data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error fetching item
 */

/**
 * @swagger
 * /api/v1/item/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error updating item
 */

/**
 * @swagger
 * /api/v1/item/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error deleting item
 */

/**
 * @swagger
 * /api/v1/item/{id}/photos:
 *   post:
 *     summary: Add a photo to an item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               altText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Photo added successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error adding photo
 */

/**
 * @swagger
 * /api/v1/item/{id}/photos/{photoId}:
 *   delete:
 *     summary: Delete a photo from an item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item ID
 *       - in: path
 *         name: photoId
 *         schema:
 *           type: string
 *         required: true
 *         description: The photo ID
 *     responses:
 *       200:
 *         description: Photo deleted successfully
 *       404:
 *         description: Item not found
 *       500:
 *         description: Error deleting photo
 */

// 1. Eşya oluşturma
router.post('/create', ItemController.createItem);

// 2. Tüm eşyaları listeleme
router.get('/', ItemController.getAllItems);

// 3. Eşya ID'ye göre getirme
router.get('/:id', ItemController.getItemById);

// 4. Eşya güncelleme
router.put('/:id', ItemController.updateItem);

// 5. Eşya silme
router.delete('/:id', ItemController.deleteItem);

// 6. Eşyaya fotoğraf ekleme
router.post('/:id/photos', ItemController.addPhoto);

// 7. Eşyadan fotoğraf silme
router.delete('/:id/photos/:photoId', ItemController.deletePhoto);

module.exports = router;
