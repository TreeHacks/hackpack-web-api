const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person')
// set up express app
const app = express();
// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;
//set up static files
app.use(express.static('public'));
// use body-parser middleware
app.use(bodyParser.json());
// initialize routes
// app.use('/api', require('./routes/api'));
// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('App listening on port 3000!');
});

app.get('/',function(req, res) {   
	res.sendFile('index.html', {root: __dirname});
});

// display all people
app.get('/friends', function(req, res, next) {
	Person.find({}, function(err, result) {
		if (!err) {
			res.send(result);
		} else {
			throw err;
		}
	});
});

// display one person's friends
app.get('/friends/:id', function(req, res, next) {
	/*Person.find({name: req.body.name}, function(err, result) {
		if (!err) {
			res.send(result);
		} else {
			throw err;
		}
	});*/
});

// adding a new person
app.post('/friends', function(req, res, next) {
	
});

// adding a friend to a person
app.put('/friends/:id', function(req, res, next) {
	
});

// removing a person
app.delete('/friends/:id', function(req, res, next) {
	
});
