import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  setUserDetails,
  uploadAvatar,
} from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.post(
  '/set-user-details',
  verifyJWT,
  upload.single('avatar'),
  setUserDetails
);

router.post('/upload-avatar', verifyJWT, upload.single('avatar'), uploadAvatar);

export default router;
