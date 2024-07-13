import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

const registerUser = asyncHandler(async (req, res) => {
  console.log('register user init');
  console.log(req.body);
  const { email, name, password } = req.body;
  const user = await User.create({ email, name, password });
  res.status(201).json({
    success: true,
    data: user,
  });
});

export { registerUser };
