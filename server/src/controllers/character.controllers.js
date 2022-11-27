const Character = require('../models/character');

module.exports = {
  getCharacters(req, res) {
    Character.find()
      .then((characters) => {
        res.json(characters);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  getCharacter(req, res) {
    const { id } = req.params;
    Character.findById(id)
      .then((character) => {
        res.json(character);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  createCharacter(req, res) {
    new Character(req.body || {})
      .save()
      .then((character) => {
        res.json(character);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  updateCharacter(req, res) {
    const { id } = req.params;
    Character.findByIdAndUpdate(id, req.body)
      .then((character) => {
        res.json(character);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  updateCharacters(req, res) {
    Character.updateMany(req.body)
      .then((characters) => {
        res.json(characters);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },

  deleteCharacter(req, res) {
    const { id } = req.params;
    Character.findByIdAndDelete(id)
      .then((character) => {
        res.json(character);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  },
};
