const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mail-controller');

/** 
 * @swagger
 * paths:
 *  /api/v1/mail/send:
 *    post:
 *      summary: Send an email.
 *      description: Allows sending an email with a subject, sender email, and message content.
 *      tags:
 *        - Mail
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                subject:
 *                  type: string
 *                  description: The subject of the email.
 *                  example: Feedback about the service
 *                email:
 *                  type: string
 *                  format: email
 *                  description: Sender's email address.
 *                  example: user@example.com
 *                message:
 *                  type: string
 *                  description: The message content to be sent in the email.
 *                  example: I would like to know more about your services.
 *              required:
 *                - subject
 *                - email
 *                - message
 *      responses:
 *        200:
 *          description: Email sent successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: true
 *                  message:
 *                    type: string
 *                    example: E-posta başarıyla gönderildi.
 *        500:
 *          description: Error occurred while sending the email.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  success:
 *                    type: boolean
 *                    example: false
 *                  message:
 *                    type: string
 *                    example: E-posta gönderilirken bir hata oluştu.
 */

router.post('/send', MailController.sendMail);

module.exports = router;
