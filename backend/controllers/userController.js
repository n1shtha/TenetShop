const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
//const { response } = require("express");
const {google} = require("googleapis");
const {OAuth2} = google.auth;

const client = new OAuth2(process.env.MAILING_CLIENT_ID);
// Register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

// User login

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user has provided both email and password

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email ID and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email ID or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email ID or password", 401));
  }

  sendToken(user, 200, res);
});

exports.googlelogin = async(req, res) => {
  try {
    const {tokenId} = req.body;
    const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_CLIENT_ID });
    const {email_verified, email, name, picture} = verify.payload;
    const password = email + process.env.GOOGLE_SECRET;
    const passwordHash = await bcrypt.hash(password, 12);

    console.log(verify);
    if(!email_verified) return res.status(400).json({msg: "Email verification failed."});
    
    const user = await User.findOne({email});

      if(user) {
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({msg: "Password is incorrect"});
        const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})

      } else{
        const newUser = new User({
          name, email, password: passwordHash, avatar: picture
      })
      await newUser.save();

      const refresh_token = createRefreshToken({id: newUser._id})
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7*24*60*60*1000 // 7 days
    })        

      res.json({msg: "Login success!"})
    }
  
  } catch (error) {
    return res.status(200).json({msg: error.message})
  }
};


//Google Login
// exports.googlelogin = catchAsyncError(async(req, res) => {
//   const {tokenId} = req.body;
//   client.verifyIdToken({ idToken: tokenId, 
//   audience: "932382815810-u2rvrnshr1jnnal448ikhvap4serp8q1.apps.googleusercontent.com"}).then(response);
//   const { email_verified, name, email} =response.payload;
//   if(email_verified) {
//     User.findOne({ email }).exec((err, user) => {
//       if(err) {
//         return res.status(400).json({
//           error: "Wrong!"
//         })
//       } else {
        
//         } 
      
//     })
//   }
// sendToken(user, 200, res);
// });

// User logout

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// Forgot password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get reset password token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Tenet Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // Creating token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is invalid or expired", 404)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
// Update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // We will add cloudinary later
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//Get all users (admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    user,
  });
});

//Get single user(admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});
// Update User role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
  });
});

// Delete User (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // We will remove cloudinary later
  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  await user.remove();

  res.status(400).json({
    success: true,
    message: "User Deleted successfully",
  });
});
