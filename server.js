//Dependencies
//------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

//Controllers
const riversController = require('./controllers/rivers');
const userController = require('./controllers/users');
const sessionController = require('./controllers/sessions');



//--------------------------------------------
require('dotenv').config();
const secret = process.env.SECRET;
const map = process.env.MAP;

//html
app.use(express.static('public'))

//PORT 
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false
}))

//Middleware
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use('/rivers', riversController);

// static files middleware
app.use('/sessions', sessionController)
app.use('/user', userController)


//////////////Database////////////////////
//Connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Rivers'

// Connect to Mongo/DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});



//index
app.get('/', (req, res) => {
    res.redirect('/rivers')
})

//Listener
app.listen(PORT, () => console.log('Listening on port:', PORT));