//Dependencies
//------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const riversController = require('./Controllers/rivers');

const methodOverride = require('method-override');
//--------------------------------------


//PORT 
const PORT = process.env.PORT || 3000;

//////////////Database////////////////////
//Connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Rivers'

// Connect to Mongo/DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});

//Middleware
app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'));
app.use('/rivers', riversController);


//index
app.get('/', (req, res) => {
    res.redirect('/rivers')
})

//Listener
app.listen(PORT, () => console.log('Listening on port:', PORT));