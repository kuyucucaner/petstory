const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user-controller');
const multer = require('multer');
const sanitize = require('sanitize-filename'); // sanitize-filename modülünü kullanın

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API for managing users
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user's data
 *       404:
 *         description: User not found
 *       500:
 *         description: Error fetching user
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-posta adresi
 *                 format: email
 *               password:
 *                 type: string
 *                 description: Şifre
 *                 format: password
 *               phone:
 *                 type: string
 *                 description: Telefon numarası
 *               photo:
 *                 type: string
 *                 description: Fotoğraf
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *                   zipCode:
 *                     type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Doğum tarihi
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error updating user
 */

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error deleting user
 */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = sanitize(Date.now() + '-' + file.originalname);
    cb(null, sanitizedFileName);
  }
});

const upload = multer({ storage: storage });
  // Update user by ID
  router.put('/:id', upload.single('photo'),UserController.updateUser);
// Get user by ID
router.get('/:id', UserController.getUserById);


// Delete user by ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
