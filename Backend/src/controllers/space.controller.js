import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Space } from '../models/space.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { spaceAvatar_Upload_Options } from '../constants.js';

const getAllSpaces = asyncHandler(async (req, res) => {
  const spaces = await Space.find().populate(
    'owner',
    'name email skills avatar socialLinks'
  );

  if (!spaces) {
    throw new ApiError(404, 'No spaces found');
  }

  res.status(200).json(new ApiResponse(200, spaces, 'All spaces'));
});

const createSpace = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, 'Space name is required');
  }

  const spaceLocalPhoto = req.file.path;

  if (!spaceLocalPhoto) {
    throw new ApiError(400, 'Please upload Space Avatar');
  }

  const spacePhotoUpload = await uploadOnCloudinary(
    spaceLocalPhoto,
    spaceAvatar_Upload_Options
  );

  if (!spacePhotoUpload) {
    throw new ApiError(500, 'Error uploading space photo');
  }

  const space = new Space({
    name,
    description,
    owner: req.user._id,
    spaceAvatar: {
      url: spacePhotoUpload.secure_url,
      fileId: spacePhotoUpload.public_id,
    },
  });

  const newSpace = await space.save();

  if (!newSpace) {
    throw new ApiError(500, 'Error creating space');
  }

  res.status(201).json(new ApiResponse(201, newSpace, 'Space created'));
});

const updateSpaceDetails = asyncHandler(async (req, res) => {
  if (req.body.file) {
  }
  const { name, description } = req.body;

  const space = await Space.findById(req.params.spaceId);

  if (!space) {
    throw new ApiError(404, 'Space not found');
  }

  if (space.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to update this space');
  }

  const updatedSpace = await Space.findByIdAndUpdate(
    req.params.spaceId,
    {
      name,
      description,
    },
    { new: true }
  );

  if (!updatedSpace) {
    throw new ApiError(500, 'Error updating space');
  }

  res.status(200).json(new ApiResponse(200, updatedSpace, 'Space updated'));
});
