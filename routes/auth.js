const express = require('express');
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");
const router = express.Router();
const {  cloudinary,storage } = require('../middleware/cloudConfig'); // Import multer and cloudinary
const multer = require('multer'); // Import multer for file uploads
const upload = multer({ storage });
const User = require('../models/user.js'); // Import User model
const {validateUser}=require("../middleware/validate.js")


// Login route
router.post(
  '/login',
  saveRedirectUrl,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
    successFlash:"Success",
    failureFlash:"Failure",
  })
);

// Signup route with profile picture upload
router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  console.log("Signup request body:", req.body); // Log the request body
  console.log("Uploaded file:", req.file); // Log the uploaded file (if any)

  const { error } = validateUser(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message); // Log validation errors
    req.flash('error_msg', error.details[0].message);
    return res.redirect('/');
  }


  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("User already exists with email:", req.body.email); // Log duplicate user
      req.flash('error_msg', 'User already exists');
      return res.redirect('/');
    }

    let profilePictureUrl = null;

    // Upload to Cloudinary if a file is uploaded
    if (req.file) {
      console.log("Uploading file to Cloudinary...");
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'profile_pictures', // Cloudinary folder
      });
      profilePictureUrl = result.secure_url; // Get the Cloudinary URL
      console.log("Uploaded profile picture URL:", profilePictureUrl);
    }

    const user = new User(req.body);

    await user.save();
    console.log("User registered successfully:", user); // Log the saved user
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/');
  } catch (err) {
    console.error("Error during signup:", err); // Log server errors
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
});

module.exports = router;