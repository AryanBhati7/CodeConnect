import { Router } from 'express';
import { registerUser } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUser);

router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Hello World',
  });
});

export default router;
