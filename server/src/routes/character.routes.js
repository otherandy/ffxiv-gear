const { Router } = require('express');
const router = Router();

const {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/character.controllers');

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
