const MailConfig = require('../config/mail-config');

const MailController = {
    sendMail: async (req, res) => {
        const { subject, email, message } = req.body;
        try {
            const from = email;
            const subjectText = `${subject}`; // Renamed to avoid redeclaration conflict
            const text = `
            Email: ${email}
            Request: ${message}
            `;
            await MailConfig.sendEmailConfig(from, subjectText, text);
            res.status(200).json({ success: true, message: 'E-posta başarıyla gönderildi.' });
        } catch (error) {
            console.error('E-posta gönderme hatası:', error);
            res.status(500).json({ success: false, message: 'E-posta gönderilirken bir hata oluştu.' });
        }
    }
};

module.exports = MailController;