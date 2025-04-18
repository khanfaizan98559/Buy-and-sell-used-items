const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const initializePassport = require('./middleware/passport-config');
const User = require('./models/user'); // Import the user model
const flash = require('connect-flash'); // Import flash

// Load environment variables
dotenv.config();

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const chatRoutes = require('./routes/chat');
const logRoutes = require('./routes/log');
const searchRoutes=require("./routes/search")

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Initialize Passport
initializePassport(passport);

// Middleware
app.use('/uploads', express.static('uploads'));
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
    cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  })
);

// Flash middleware
app.use(flash());



// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables for flash messages
app.use((req, res, next) => {
  res.locals.currUser=req.user || null
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  console.log('Authenticated User:', req.user);
  next();
});

// Use routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/search', searchRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/chats', chatRoutes);
app.use('/logs', logRoutes);

// Handle 404 errors
app.use((req, res, next) => {
    res.status(404).render('pages/error', {
        errorCode: 404,
        errorMessage: "Page Not Found",
        description: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    });
});

// Handle other errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(err.status || 500).render('pages/error', {
        errorCode: err.status || 500,
        errorMessage: "Internal Server Error",
        description: "Something went wrong on our end. Please try again later."
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});