const { Schema, model } = require('mongoose');

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  weapon: String,
  head: String,
  body: String,
  hands: String,
  legs: String,
  feet: String,
  earrings: String,
  necklace: String,
  bracelets: String,
  leftRing: String,
  rightRing: String,
});

module.exports = model('character', characterSchema);
