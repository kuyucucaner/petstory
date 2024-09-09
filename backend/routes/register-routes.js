const express = require('express');
const router = express.Router();
const register = require('../controllers/register-controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterSchema:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - phone
 *       properties:
 *         firstName:
 *           type: string
 *           description:  Adı
 *         lastName:
 *           type: string
 *           description:  Soyadı
 *         email:
 *           type: string
 *           description:  E-posta adresi
 *           format: email
 *         password:
 *           type: string
 *           description:  Şifre
 *           format: password
 *         phone:
 *           type: string
 *           description :  Telefon Numarası
 */

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: Kullanıcı Kayıt İşlemi
 */

/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: Yeni bir kullanıcı oluştur
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Kullanıcıyı tanımlamak için JWT token
 *       400:
 *         description: E-posta adresi zaten kullanılıyor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Hata mesajı
 *       500:
 *         description: Sunucu hatası
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Sunucu hatası
 */

// @route   POST /api/auth/register
// @desc    Kullanıcı kaydı
// @access  Public
router.post('/', register);

module.exports = router;
