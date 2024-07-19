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
  const { name, description, technologies, repoLink, hostedLink } = req.body;

  if (!name || !description) {
    throw new ApiError(400, 'Both Name and description are required');
  }
  if (!technologies || technologies.length === 0) {
    throw new ApiError(400, 'At least one technology is required');
  }
  const projectLocalPhoto = req.file.path;

  if (!projectLocalPhoto) {
    throw new ApiError(400, 'Please upload atleast one project photo');
  }

  const projectPhotoUpload = await uploadOnCloudinary(
    projectLocalPhoto,
    projectPhoto_Upload_Options
  );

  if (!projectPhotoUpload) {
    throw new ApiError(500, 'Error uploading project photo');
  }

  const project = new Project({
    name,
    description,
    technologies,
    repoLink,
    hostedLink,
    owner: req.user._id,
    projectPhoto: {
      url: projectPhotoUpload.secure_url,
      fileId: projectPhotoUpload.public_id,
    },
  });

  const savedProject = await project.save();

  if (!savedProject) {
    throw new ApiError(400, 'Error saving project');
  }

  res
    .status(201)
    .json(new ApiResponse(201, savedProject, 'Project added successfully'));
});

const updateProjectDetails = asyncHandler(async (req, res) => {
  const { name, description, technologies, repoLink, hostedLink } = req.body;
  const projectId = req.params.id;

  if (!name || !description) {
    throw new ApiError(400, 'Both Name and description are required');
  }
  if (!technologies || technologies.length === 0) {
    throw new ApiError(400, 'At least one technology is required');
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to update this project');
  }

  let updateObject = {
    name,
    description,
    technologies,
    repoLink,
    hostedLink,
  };

  if (req.file) {
    const projectLocalPhoto = req.file.path;
    const projectPhotoUpload = await uploadOnCloudinary(
      projectLocalPhoto,
      projectPhoto_Upload_Options
    );

    if (!projectPhotoUpload) {
      throw new ApiError(500, 'Error uploading project photo');
    }

    await deleteFromCloudinary(project.projectPhoto.fileId);

    updateObject.projectPhoto = {
      url: projectPhotoUpload.secure_url,
      fileId: projectPhotoUpload.public_id,
    };
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    updateObject,
    { new: true }
  );

  if (!updatedProject) {
    throw new ApiError(400, 'Error updating project');
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedProject, 'Project updated successfully'));
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

  await deleteFromCloudinary(project.projectPhoto.fileId);

  const deleteProject = await Project.findByIdAndDelete(projectId);

  if (!deleteProject) {
    throw new ApiError(400, 'Error deleting project');
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, 'Project deleted successfully'));
});

export {
  addNewProject,
  updateProjectDetails,
  deleteProject,
  getAllProjects,
  getProjectById,
};
