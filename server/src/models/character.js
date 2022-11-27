const { Schema, model } = require('mongoose');

const characterSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    job: {
      type: String,
      default: '',
    },
    gearset: {
      type: String,
      default: '',
    },
    weapon: { type: String, default: "Don't need" },
    head: { type: String, default: "Don't need" },
    body: { type: String, default: "Don't need" },
    hands: { type: String, default: "Don't need" },
    legs: { type: String, default: "Don't need" },
    feet: { type: String, default: "Don't need" },
    earrings: { type: String, default: "Don't need" },
    necklace: { type: String, default: "Don't need" },
    bracelets: { type: String, default: "Don't need" },
    leftRing: { type: String, default: "Don't need" },
    rightRing: { type: String, default: "Don't need" },
  },
  {
    timestamps: true,
    statics: {
      findByName(name) {
        return this.findOne({ name });
      },
    },
  }
);

module.exports = model('character', characterSchema);
