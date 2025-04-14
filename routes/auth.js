const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const { registerValidation } = require('../utils/validation');
const { saveRedirectUrl } = require("../middleware.js");
const { upload, cloudinary } = require('../middleware/multer'); // Import multer and cloudinary
const router = express.Router();

// Login route
router.post(
  '/login',
  saveRedirectUrl,
  passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true,
  })
);

// Signup route with profile picture upload
router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    req.flash('error_msg', error.details[0].message);
    return res.redirect('/signup');
  }

  const { userName, signupPhoneNo, signupEmailId, signupPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email: signupEmailId });
    if (existingUser) {
      req.flash('error_msg', 'User already exists');
      return res.redirect('/');
    }

    let profilePictureUrl = null;

    // Upload to Cloudinary if a file is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures', // Cloudinary folder
      });
      profilePictureUrl = result.secure_url; // Get the Cloudinary URL
    }

    const user = new User({
      name: userName,
      phone: signupPhoneNo,
      email: signupEmailId,
      password: signupPassword,
      profilePicture: profilePictureUrl, // Save Cloudinary URL
    });

    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Server error');
    res.redirect('/signup');
  }
});

module.exports = router;