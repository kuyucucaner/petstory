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
    // Evcil hayvan bilgilerini güncelleme
    updateUser : async  function (req, res)  {
        const { id } = req.params;
        const { email, password, phone, photo, address, dateOfBirth } = req.body;
      
        try {
          const user = await User.findById(id);
          if (!user) {
            return res.status(404).json({ message: 'user not found' });
          }
      
          // Evcil hayvan bilgilerini güncelle
          user.email = email || user.email;
          user.password = password || user.password;
          user.phone = phone || user.phone;
          user.photo = photo || user.photo;
          user.address = address || user.address;
          user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      
          const updatedUser = await user.save();
          res.status(200).json(updatedUser);
        } catch (error) {
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
