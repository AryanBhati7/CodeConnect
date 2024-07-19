import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  addNewProject,
  updateProjectDetails,
  deleteProject,
  getProjectById,
  getAllProjects,
} from '../controllers/project.controller.js';

const router = Router();
router.use(verifyJWT);

router.post('/add', upload.single('projectPhoto'), addNewProject);

router.get('/', getAllProjects);
router
  .route('/:id')
  .patch(upload.single('projectPhoto'), updateProjectDetails)
  .delete(deleteProject)
  .get(getProjectById);

export default router;
