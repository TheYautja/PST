import express from 'express';
import {
  getAll,
  getByID,
  createPlantEntry,
  deletePlant,
  getFirst36,
  getFirstN
} from '../controllers/plantController.js';

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getByID);
router.get('/first36', getFirst36);
router.get('/limit/:count', getFirstN);
router.post('/', createPlantEntry);
router.delete('/:id', deletePlant);

export default router;
