const { Router } = require('express');
const router = Router();

const {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  updateCharacters,
  deleteCharacter,
} = require('../controllers/character.controllers');

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.put('/', updateCharacters);
router.delete('/:id', deleteCharacter);

module.exports = router;
