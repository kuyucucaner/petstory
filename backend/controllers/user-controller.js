const User = require("../models/user-model"); // If you are referring to the User model
const fs = require("fs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const UserController = {
  // Get a single user by ID
  getUserById: async function (req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log("User Data Controller : ", user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  updateUser: async function (req, res) {
    const { id } = req.params;
    const {
      email,
      password,
      phone,
      address,
      dateOfBirth,
      firstName,
      lastName,
    } = req.body;

    console.log("Request body:", req.body); // Gelen veriyi kontrol et
    console.log("File:", req.file); // Yüklenen dosyayı kontrol edin

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Kullanıcı bilgilerini güncelle
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;

      if (password) {
        user.password = password; // Şifre değiştirildi, pre-save hook çalışacak
        user.markModified("password"); // Şifre değiştirildiğini belirtiyoruz
      }

      user.phone = phone || user.phone;

      // Parse the address if it is a string (as seen in your request body)
      if (typeof address === "string") {
        user.address = JSON.parse(address);
      } else {
        user.address = address || user.address;
      }

      user.dateOfBirth = dateOfBirth || user.dateOfBirth;

      // Dosya yüklendiyse eski dosyayı silin (isteğe bağlı)
      if (req.file) {
        // Eski dosyayı silme işlemi
        if (user.photo && fs.existsSync(user.photo)) {
          fs.unlinkSync(user.photo);
        }
        // Ters eğik çizgileri düzelt
        const fixedPath = req.file.path.replace(/\\/g, "/");
        user.photo = fixedPath; // Yeni dosyanın yolunu kaydedin
      }

      // Güncellenen kullanıcıyı kaydet
      const updatedUser = await user.save();

      // Eğer güncelleme başarılı değilse loglama yap
      if (!updatedUser) {
        return res.status(500).json({ message: "Error saving updated user" });
      }

      console.log("Updated user:", updatedUser); // Başarılı güncelleme
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error); // Hata loglama
      res.status(500).json({ message: "Error updating user", error });
    }
  },

  // Soft delete a user (set isDelete to true)
  deleteUser: async function (req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Implement soft delete by marking the user as deleted
      user.isDelete = true;
      await user.save();

      res
        .status(200)
        .json({ message: "User deleted successfully (soft delete)" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  },
  passwordReset: async function (req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("Kullanıcı bulunamadı.");

      const resetToken = crypto.randomBytes(32).toString("hex");
      user.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 dakika
      await user.save();

      const resetURL = `http://localhost:3000/reset-password-form/${resetToken}`;


      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        to: email,
        from: process.env.MAIL_ID,
        subject: "Şifre Sıfırlama Talebi",
        text: `Şifrenizi sıfırlamak için şu bağlantıya tıklayın: \n\n ${resetURL}`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err)
          return res.status(500).send("E-posta gönderilirken hata oluştu.");
        res.status(200).send("Şifre sıfırlama bağlantısı gönderildi.");
      });
    } catch (err) {
      return res.status(500).send("Sunucu hatası: " + err.message);
    }
  },

  passwordResetToken: async function (req, res) {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).send("Token geçersiz veya süresi dolmuş.");

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send("Şifre başarıyla sıfırlandı.");
  },
};

module.exports = UserController;
