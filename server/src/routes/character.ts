import { Router } from 'express';
const router = Router();

import {
  getCharacters,
  getCharacter,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '../controllers/character';

router.get('/', getCharacters);
router.get('/:id', getCharacter);
router.post('/', createCharacter);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

export default router;
