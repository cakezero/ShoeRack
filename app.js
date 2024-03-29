require('dotenv').config();
const express = require('express')
const bnsRoutes = require('./routes/bnsRoutes')
const rnlRoutes = require('./routes/rnlRoutes')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Database Connection
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI)
    .then(() => console.log('Connected to the DB!!!'))
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err, "Couldn't Connect to the DB!!!"));

// Universal Middleware
app.get('*', checkUser);

// Home Controller
app.use('/', bnsRoutes);


// About
app.get('/about', (req, res) =>{
    res.render('about');
});

//Register and Login
app.use('/user', rnlRoutes);
