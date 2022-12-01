import { Router } from 'express';
const router = Router();

import { updateGear } from '../controllers/etro';

router.post('/:id', updateGear);

export default router;
