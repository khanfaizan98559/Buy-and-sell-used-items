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

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        req.flash('success_msg', 'You have logged out successfully.');
        res.redirect('/');
    });
});

// Signup route with profile picture upload
router.post('/signup', upload.single('profilePicture'), async (req, res) => {

  const { error } = validateUser(req.body);
  if (error) {
    req.flash('error_msg', error.details[0].message);
    return res.redirect('/');
  }


  try {
    const existingUser = await User.findOne({ email: req.body.email });
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

    const user = new User(req.body);

    await user.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/');
  } catch (err) {
    console.error("Error during signup:", err); // Log server errors
    req.flash('error_msg', 'Server error');
    res.redirect('/');
  }
});

module.exports = router;