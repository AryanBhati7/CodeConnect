import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import {
  addNewProject,
  updateProjectDetails,
  deleteProject,
  getProjectById,
  getAllProjects,
  deleteProjectPicture,
} from '../controllers/project.controller.js';

const router = Router();
router.use(verifyJWT);

router.post('/add', upload.array('projectPhotos', 6), addNewProject);

router.get('/', getAllProjects);
router
  .route('/:id')
  .patch(upload.array('projectPhotos', 6), updateProjectDetails)
  .patch(
    upload.fields([{ name: 'projectPhotos', maxCount: 6 }]),
    updateProjectDetails
  )
  .delete(deleteProject)
  .get(getProjectById);

router.route('/:id/picture/:pictureId').delete(deleteProjectPicture);

export default router;
