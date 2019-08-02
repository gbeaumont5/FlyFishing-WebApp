//Dependencies
//------------------------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//--------------------------------------


//PORT 
const PORT = process.env.PORT || 3000;

//////////////Database////////////////////
//Connect to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Rivers'

// Connect to Mongo
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, () => {
	console.log('connected to mongo database')
});

//-----------------------------------------------
// Routes
//-----------------------------------------------

//localhost:3000
app.get('/' , (req, res) => {
  res.send('app is running!');
});

//Listener
app.listen(PORT, () => console.log('Listening on port:', PORT));