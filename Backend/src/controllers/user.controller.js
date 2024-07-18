import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary';

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

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, 'User details added successfully'));
});
