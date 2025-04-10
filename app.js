const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const initializePassport = require('./passport-config');
const User = require('./models/User'); // Import the user model
const flash = require('connect-flash'); // Import flash


// Load environment variables
dotenv.config();

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Initialize Passport
initializePassport(passport);

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', ejsMate);

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Flash middleware
app.use(flash());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error'); // For Passport errors
  next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 