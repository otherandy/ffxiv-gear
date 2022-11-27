import { Router } from 'express';
const router = Router();

import {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  updateCharacters,
  deleteCharacter,
} from '../controllers/character.controllers';

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.put('/', updateCharacters);
router.delete('/:id', deleteCharacter);

export default router;
