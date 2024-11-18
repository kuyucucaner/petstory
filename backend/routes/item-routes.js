    const express = require('express');
    const router = express.Router();
    const ItemController = require('../controllers/item-controller');
    const upload = require('../config/multer'); // multer.js dosyasından import edin

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
 * /api/v1/item/category/{category}:
 *   get:
 *     summary: Get items by category
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category of the items to retrieve
 *         schema:
 *           type: string
 *           enum: [bed, toy, food bowl, leash, other]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: No items found for this category
 *       500:
 *         description: Server error
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
 * /api/v1/item/owner/{role}:
 *   get:
 *     summary: Get items by role
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Role for items
 *         schema:
 *           type: string
 *           enum: [vet, owner ,user]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       404:
 *         description: No item found for this role
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/v1/item/search:
 *   get:
 *     summary: "Search items"
 *     tags: [Item]
 *     description: "Searches for items based on a query string that matches name, description, category, or condition."
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "The name of the item to search for."
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         description: "The description of the item to search for."
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: "The category of the item to search for."
 *       - in: query
 *         name: condition
 *         schema:
 *           type: string
 *         description: "The condition of the item to search for."
 *     responses:
 *       200:
 *         description: "List of items matching the search query"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: "An error occurred while searching for items"
 */

router.get('/search', ItemController.getItemSearchResults);

    // 1. Eşya oluşturma
    router.post('/create', upload.array('photo', 5), ItemController.createItem);

    // 2. Tüm eşyaları listeleme
    router.get('/', ItemController.getAllItems);

    // 3. Eşya ID'ye göre getirme
    router.get('/:id', ItemController.getItemById);

    router.get('/category/:category', ItemController.getItemsByCategory);

    router.get('/owner/:role', ItemController.getItemsByOwnerRole);

    // 4. Eşya güncelleme
    router.put('/:id',upload.array('photo', 5),ItemController.updateItem);

    // 5. Eşya silme
    router.delete('/:id', ItemController.deleteItem);


    module.exports = router;
