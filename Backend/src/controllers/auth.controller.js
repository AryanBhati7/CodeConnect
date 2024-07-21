import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, 'Something went wrong while generating tokens');
  }
};

const doesUserExist = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.status(200).json(new ApiResponse(200, user, 'User found'));
});

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    throw new ApiError(400, 'Please provide all fields');
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { name }],
  });

  if (existedUser) throw new ApiError(400, 'User already exists');

  const user = await User.create({ email, name, password });

  if (!user) {
    throw new ApiError(400, 'User not created');
  }

  const createdUser = await User.findById(user._id).select('-password');

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, 'User created successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Please either Email or Name and password');
  }

  const user = await User.findOne({
    $or: { email },
  });

  if (!user) {
    throw new ApiError(401, 'User not Found');
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  res.setHeader('Set-Cookie', [
    `accessToken=${accessToken}; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.ACCESS_TOKEN_EXPIRY}; Path=/`,
    `refreshToken=${refreshToken}; HttpOnly; SameSite=None; Secure; Max-Age=${process.env.REFRESH_TOKEN_EXPIRY}; Path=/`,
  ]);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        'User logged in successfully'
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await User.findByIdAndUpdate(
    userId,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );

  res.setHeader('Set-Cookie', [
    'accessToken=; HttpOnly; SameSite=None; Secure; Max-Age=-1; Path=/',
    'refreshToken=; HttpOnly; SameSite=None; Secure; Max-Age=-1; Path=/',
  ]);

  return res.status(200).json(new ApiResponse(200, {}, 'User logged out'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    '-password -refreshToken'
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return res.status(200).json(new ApiResponse(200, user, 'User found'));
});

export { registerUser, loginUser, logoutUser, getCurrentUser, doesUserExist };
