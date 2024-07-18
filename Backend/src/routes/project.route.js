import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  addNewProject,
  updateProjectDetails,
  deleteProject,
} from '../controllers/project.controller.js';

const router = Router();
router.use(verifyJWT);

router.post('/add', upload.single('projectPhoto'), addNewProject);

router
  .route('/:id')
  .patch(upload.single('projectPhoto'), updateProjectDetails)
  .delete(deleteProject);

export default router;
