import { asyncHandler } from '../utils/asyncHandler.js';
import { Project } from '../models/project.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinary.js';
import { projectPhoto_Upload_Options } from '../constants.js';

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate(
    'owner',
    'name email skills avatar socialLinks'
  );

  if (!projects) {
    throw new ApiError(404, 'No projects found');
  }

  res.status(200).json(new ApiResponse(200, projects, 'All projects'));
});

const getProjectById = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  const project = await Project.findById(projectId).populate(
    'owner',
    'name email skills avatar socialLinks'
  );

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  res.status(200).json(new ApiResponse(200, project, 'Project'));
});

const addNewProject = asyncHandler(async (req, res) => {
  console.log(req.files);
  const { name, description, technologies, repoLink, hostedLink } = req.body;

  if (!name || !description) {
    throw new ApiError(400, 'Both Name and description are required');
  }
  if (!technologies || technologies.length === 0) {
    throw new ApiError(400, 'At least one technology is required');
  }

  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, 'Please upload at least one project photo');
  }

  const project = await Project.create({
    name,
    description,
    technologies,
    repoLink,
    hostedLink,
    owner: req.user._id,
    pictures: [],
  });

  try {
    for (let file of req.files) {
      const projectPhotoUpload = await uploadOnCloudinary(
        file.path,
        projectPhoto_Upload_Options
      );

      if (!projectPhotoUpload) {
        throw new ApiError(500, 'Error uploading project photo');
      }

      project.pictures.push({
        url: projectPhotoUpload.secure_url,
        fileId: projectPhotoUpload.public_id,
      });
    }

    const savedProject = await project.save();

    res
      .status(201)
      .json(new ApiResponse(201, savedProject, 'Project added successfully'));
  } catch (error) {
    throw new ApiError(500, 'An error occurred while uploading images');
  }
});

const updateProjectDetails = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to update this project');
  }

  const { name, description, technologies, repoLink, hostedLink } = req.body;

  if (!name || !description) {
    throw new ApiError(400, 'Both Name and description are required');
  }

  if (!technologies || technologies.length === 0) {
    throw new ApiError(400, 'At least one technology is required');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      name,
      description,
      technologies,
      repoLink,
      hostedLink,
    },
    { new: true }
  );

  if (!updatedProject) {
    throw new ApiError(400, 'Error updating project');
  }

  if (req.files && req.files.length > 0) {
    for (let file of req.files) {
      const projectPhotoUpload = await uploadOnCloudinary(
        file.path,
        projectPhoto_Upload_Options
      );

      if (!projectPhotoUpload) {
        throw new ApiError(500, 'Error uploading project photo');
      }
    }

    const savedProject = await updatedProject.save();

    res
      .status(200)
      .json(new ApiResponse(200, savedProject, 'Project updated successfully'));
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.params.id;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this project');
  }

  for (let picture of project.pictures) {
    await deleteFromCloudinary(picture.fileId);
  }

  const deleteProject = await Project.findByIdAndDelete(projectId);

  if (!deleteProject) {
    throw new ApiError(400, 'Error deleting project');
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Project deleted successfully'));
});

const deleteProjectPicture = asyncHandler(async (req, res) => {
  const projectId = req.params.id;
  const pictureId = req.params.pictureId;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      'You are not authorized to delete this project picture'
    );
  }

  const picture = project.pictures.find(
    (picture) => picture.fileId.toString() === pictureId
  );

  if (!picture) {
    throw new ApiError(404, 'Picture not found');
  }

  await deleteFromCloudinary(picture.fileId);

  project.pictures = project.pictures.filter(
    (picture) => picture.fileId.toString() !== pictureId
  );

  const savedProject = await project.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, savedProject, 'Project picture deleted successfully')
    );
});

export {
  addNewProject,
  updateProjectDetails,
  deleteProject,
  getAllProjects,
  getProjectById,
  deleteProjectPicture,
};
