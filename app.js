const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require("path");
var request = require('request');
const Person = require('./models/person')

// Set up the Express app
const app = express();

// Connect to MongoDB - should be running locally
mongoose.connect('mongodb://localhost/people');
mongoose.Promise = global.Promise;

// Set up static files
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));

// Use body-parser to parse HTTP request parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // To see properties of message in our console
    res.status(422).send({error: err.message});
});

var port = process.env.PORT || 3000;

// Starts the Express server, which will run locally @ localhost:3000
app.listen(port, function() {
    console.log('App listening on port 3000!');
});

// Serves the index.html file (our basic frontend)
app.get('/',function(req, res) {   
	res.sendFile('index.html', {root: __dirname});
}); 

// GET route that displays all people (finds all Person objects)
app.get('/people', function(req, res, next) {
	Person.find({}, function(err, result) {
		if (err) {
			console.log(err)
		} else {
			res.send(result); // Sends the result as JSON
		}
	});
});

// GET route that displays one person's friends 
app.get('/people/:id', function(req, res, next) {
	Person.findById(req.params.id, function(err, result) { // Finds person with id (param)
		if (!err) {
			res.send(result.friends); // Returns the person's friends array as JSON
		} else {
			throw err;
		}
	});
});

// POST route that adds a new Person object
app.post('/people', function(req, res, next) {
	// First gets a random dog image URL
	request('https://dog.ceo/api/breeds/image/random', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var person = new Person();
			person.name = req.body.name; // Stores the 'name' string
			person.dog = JSON.parse(body).message; // Stores the 'dog' image URL
			person.friends = []; // Initializes an empty array of friends
			person.save(function(err, person) { // Saves the Person object to the database
				if (err) {
					console.log(err);
				} else {
					res.send(person); // Returns the new object as JSON
				}
			})
	  	}
	});
});

// PUT route that adds a friend to a person
app.put('/people/:id', function(req, res, next) {
	Person.findById(req.params.id, function(err, person) { // Finds a Person by id (param in URL)
		person.friends.push(req.body.id); // Adds the friend with ID in POST parameters
		person.save(function(err) { // Saves the Person object
			if (err) {
				console.log(err);
			} else {
				Person.findById(req.body.id, function(err, person) { // Same, but for the 2nd person 
					person.friends.push(req.params.id); // Saves the Person object
					person.save(function(err) {
						if (err) {
							console.log(err);
						} else {
							res.send("Friendship between " + req.body.id + " and " + req.params.id + "created!");
						}
					})
				});
			}
		})
	});
});

// DELETE route that removes a Person object from the database
app.delete('/people/:id', function(req, res, next) {
	Person.findByIdAndRemove(req.params.id, function(err, result) { // Finds by ID and remove
		if (err) {
			console.log(err);
		} else {
			res.send("Deleted person with id " + req.params.id);
		}
	});
});
