import User from "../models/user";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import APIFeatures from "../utils/apiFeatures";

// Register user    =>    /api/auth/register

const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "PUBLIC_ID",
      url: "URL",
    },
  });

  res.status(200).json({
    success: true,
    message: "Account Registered successfuly",
  });
});

export { registerUser };
