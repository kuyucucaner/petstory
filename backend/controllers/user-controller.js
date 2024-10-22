const User = require('../models/user-model'); // If you are referring to the User model

const UserController = {
  // Get a single user by ID
  getUserById: async function (req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  },
  updateUser: async function (req, res) {
    const { id } = req.params;
    const { email, password, phone, address, dateOfBirth, firstName, lastName } = req.body;
  
    console.log('Request body:', req.body);  // Gelen veriyi kontrol et
    console.log('File:', req.file);  // Yüklenen dosyayı kontrol edin

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Kullanıcı bilgilerini güncelle
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      if (password) {
        user.password = password;  // Şifre değiştirildi, pre-save hook çalışacak
        user.markModified('password');  // Şifre değiştirildiğini belirtiyoruz
      }
      user.phone = phone || user.phone;
      user.address = address || user.address;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
          // Dosya yüklendiyse eski dosyayı silin (isteğe bağlı)
          // if (req.file) {
          //   Eski fotoğraf dosyasını sil (isteğe bağlı)
          //   if (user.photo && fs.existsSync(user.photo)) {
          //     fs.unlinkSync(user.photo);  // Eski dosya var mı kontrol et ve sil
          //   }
          //   user.photo = req.file.path;  // Yeni dosyanın yolunu kaydedin
          // }
    
      if (req.file) {
        user.photo = req.file.path;  // Fotoğrafın dosya yolunu kaydedin
      }
      // Güncellenen kullanıcıyı kaydet
      const updatedUser = await user.save();
      
      // Eğer güncelleme başarılı değilse loglama yap
      if (!updatedUser) {
        return res.status(500).json({ message: 'Error saving updated user' });
      }
  
      console.log('Updated user:', updatedUser); // Başarılı güncelleme
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);  // Hata loglama
      res.status(500).json({ message: 'Error updating user', error });
    }
  },
  


  // Soft delete a user (set isDelete to true)
  deleteUser: async function (req, res) {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Implement soft delete by marking the user as deleted
      user.isDelete = true;
      await user.save();

      res.status(200).json({ message: 'User deleted successfully (soft delete)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },
};

module.exports = UserController;
