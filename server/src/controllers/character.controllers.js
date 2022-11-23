const character = require('../models/character');

module.exports = {
  async getCharacters(req, res) {
    try {
      const characters = await character.find();
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getCharacter(req, res) {
    const { id } = req.params;
    const character = await character.findById(id);
    res.json(character);
  },

  async createCharacter(req, res) {
    const newCharacter = new character(req.body);
    const savedCharacter = await newCharacter.save();
    res.json(savedCharacter);
  },

  async updateCharacter(req, res) {
    const { id } = req.params;
    const updatedCharacter = await character.findByIdAndUpdate(id, req.body);
    res.json(updatedCharacter);
  },

  async deleteCharacter(req, res) {
    const { id } = req.params;
    const deletedCharacter = await character.findByIdAndDelete(id);
    res.json(deletedCharacter);
  },
};
