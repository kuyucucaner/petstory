const Item = require("../models/item-model");
const User = require("../models/user-model");
const Pet = require("../models/pet-model");

const SearchController = {
  searchAll: async function (searchQuery) {
    try {
      const regex = new RegExp(searchQuery, 'i');
      
      const itemResults = await Item.find({
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { condition: regex },
        ]
      });
      
      const petResults = await Pet.find({
        $or: [
          { name: regex },
          { species: regex },
          { breed: regex },
        ]
      });
      
      const userResults = await User.find({
        $or: [
          { name: regex },
          { lastname: regex },
          { email: regex },
          { username: regex },
        ]
      });
      
      return { items: itemResults, users: userResults, pets: petResults };
      
    } catch (error) {
      throw new Error("Error during search query: " + error.message);
    }
  },
  
  getAllSearchResults: async function (req, res) {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    try {
      const searchResults = await SearchController.searchAll(query);
      console.log("Search Results:", searchResults);
      res.status(200).json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching for all' });
    }
  }
};

module.exports = SearchController;
