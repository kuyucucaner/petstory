    const express = require('express');
    const router = express.Router();
    const login = require('../controllers/login-controller');

    /**
     * @swagger
     * components:
     *   schemas:
     *     LoginSchema:
     *       type: object
     *       required:
     *         - email
     *         - password
     *       properties:
     *         email:
     *           type: string
     *           description:  E-posta adresi
     *           format: email
     *         password:
     *           type: string
     *           description:  Şifre
     *           format: password
     */

    /**
     * @swagger
     * tags:
     *   name: Login
     *   description: Kullanıcı Login İşlemi
     */

    /**
     * @swagger
     * /api/v1/login:
     *   post:
     *     summary: Üye Girişi
     *     tags: [Login]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginSchema'
     *     responses:
     *       200:
     *         description: Giriş Başarılı!
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Kullanıcıyı tanımlamak için JWT token
     *       400:
     *         description: Yanlış Kullanıcı Bilgisi!
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

    // @route   POST /api/v1/login
    // @desc    Kullanıcı girişi
    // @access  Public
    router.post('/', login);

    module.exports = router;
