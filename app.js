const express = require('express');
const brandRoutes = require('./routes/brandRoutes');
const rnlRoutes = require('./routes/rnlRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


// Database Connection
const dbURI = 'Link to the db';
mongoose.connect(dbURI)
    .then(() => console.log('Connected to the DB!!!'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err, "Couldn't Connect to the DB!!!"));


// Home
app.get('/', (req, res) =>{
    res.render('home');
});

// Brand
app.use('/brands', brandRoutes);


// About
app.get('/about', (req, res) =>{
    res.render('about');
});


// Shoe


//Register and Login
app.use('/user', rnlRoutes);
