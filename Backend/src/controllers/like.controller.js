import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Like } from '../models/like.model.js';
import { Project } from '../models/project.model.js';
import { Message } from '../models/message.model.js';

const toggleLikeProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    throw new ApiError(400, 'Please provide a project id');
  }

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const like = await Like.findOne({
    likedBy: req.user._id,
    project: project._id,
  });

  if (like) {
    await like.remove();
    return res.status(200).json(new ApiResponse(200, {}, 'Project unliked'));
  }

  const newLike = new Like({
    likedBy: req.user._id,
    project: projectId,
  });

  await newLike.save();

  res.status(201).json(new ApiResponse(201, newLike, 'Project liked'));
});

const toggleLikeMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;

  const message = await Message.findById(messageId).populate(
    'project',
    'owner'
  );

  if (!message) {
    throw new ApiError(404, 'Message not found');
  }

  const like = await Like.findOne({
    likedBy: req.user._id,
    message: messageId,
  });

  if (like) {
    await like.remove();
    return res.status(200).json(new ApiResponse(200, {}, 'Message unliked'));
  }

  const newLike = new Like({
    likedBy: req.user._id,
    message: messageId,
  });

  await newLike.save();

  res.status(201).json(new ApiResponse(201, newLike, 'Message liked'));
});

export { toggleLikeProject, toggleLikeMessage };
