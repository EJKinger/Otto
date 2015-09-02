var express = require('express');
var bodyParser = require('body-parser');
var listRouter = require('./routers/listRouter');
var pantryRouter = require('./routers/pantryRouter');
var householdRouter = require('./routers/householdRouter');

var buyRouter = require('./routers/buyRouter');

/////// DB
var mongoose = require('mongoose');
var User = require('./db/userModel.js');
var Household = require('./db/householdModel.js');
var listHelpers = require('./list-helpers.js');

mongoose.connect('mongodb://localhost/orbit');
var db = mongoose.connection;

db.once('open', function(){
  console.log('Database connection now open!');
});

////////////
var app = express();

app.use(bodyParser.json());

// Will need to adjust file paths once deployed
// For local, navigate to 127.0.0.1:1337/app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
} else {
  console.log("Using client!");
  app.use(express.static('./client'));
}

// Adds household to request
// REMOVE ONCE DB / HOUSEHOLDS / AUTH IMPLEMENTED
app.use(function(req, res, next) {
  req.body.household = 'household1';
  next();
});

app.use('/list', listRouter);
app.use('/pantry', pantryRouter);
app.use('/household', householdRouter);
app.use('/buy', buyRouter);

module.exports = app;