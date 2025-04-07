const express = require('express');
const methodOverride = require('method-override');
const ejs= require('ejs');
const path= require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const app = express();



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("ejs", ejsMate);


app.get('/contact', (req, res) => {
  res.render('pages/contact');
});

app.get('/', (req, res) => {
  res.render('pages/index');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});