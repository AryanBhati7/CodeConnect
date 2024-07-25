import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  doesUserExist,
} from '../controllers/auth.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post('/register', upload.single('avatar'), registerUser);

router.post('/login', loginUser);
router.get('/current-user', verifyJWT, getCurrentUser);
router.post('/check-email', doesUserExist);

router.post('/logout', verifyJWT, logoutUser);

export default router;
