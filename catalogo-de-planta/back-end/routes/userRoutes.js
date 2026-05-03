import express from 'express';
import {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  validateUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/validate', validateUser);

export default router;
