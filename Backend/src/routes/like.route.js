import {
  toggleLikeMessage,
  toggleLikeProject,
} from '../controllers/like.controller.js';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.post('/project/:projectId', toggleLikeProject);

router.post('/message/:messageId', toggleLikeMessage);

export default router;
