import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinary.js';
import { avatar_Upload_Options } from '../constants.js';

const uploadAvatar = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Please upload an image file');
  }
  const avatarLocalPath = req.file.path;
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (!user.avatar) {
    user.avatar = {};
  }

  if (avatarLocalPath) {
    const avatarUpload = await uploadOnCloudinary(
      avatarLocalPath,
      avatar_Upload_Options
    );

    if (!avatarUpload) {
      throw new ApiError(500, 'Error uploading avatar');
    }

    user.avatar.url = avatarUpload.secure_url;
    user.avatar.fileId = avatarUpload.public_id;
  }

  const savedUser = await user.save();

  if (!savedUser) {
    throw new ApiError(400, 'Error saving avatar');
  }

  res
    .status(200)
    .json(new ApiResponse(200, user.avatar, 'Avatar uploaded successfully'));
});

const setUserDetails = asyncHandler(async (req, res) => {
  const { bio, skills, socialLinks, wantToLearn } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (bio) user.bio = bio;
  if (skills) user.skills = skills;
  if (socialLinks) user.socialLinks = socialLinks;
  if (wantToLearn) user.wantToLearn = wantToLearn;

  const savedUser = await user.save();

  if (!savedUser) {
    throw new ApiError(400, 'Error saving user details');
  }

  const userDetails = await User.findById(req.user._id).select(
    '-password -refreshToken'
  );

  res
    .status(200)
    .json(new ApiResponse(200, userDetails, 'User details added successfully'));
});

export { setUserDetails, uploadAvatar };
