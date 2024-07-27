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
import passport from 'passport';
import axios from 'axios';

const router = Router();

router.post('/register', upload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/current-user', verifyJWT, getCurrentUser);
router.post('/check-email', doesUserExist);

router.post('/logout', verifyJWT, logoutUser);

// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     successRedirect: process.env.CORS_ORIGIN_DEV,
//     failureRedirect: `${process.env.CORS_ORIGIN_DEV}/auth/check-email`,
//   })
// );

// router.get('/google', async (req, res) => {
//   try {
//     const response = await axios.get(
//       'https://accounts.google.com/o/oauth2/v2/auth',
//       {
//         params: req.query,
//       }
//     );

//     console.log(response);
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//register user to db

export default router;
