const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var path = require("path");
const Person = require('./models/person')

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/people');
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'public/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));

// use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('App listening on port 3000!');
});

// everything below blank in final version
// write out README.md
// add another 'solutions' branch with final code

// serves index.html file
app.get('/',function(req, res) {   
	res.sendFile('index.html', {root: __dirname});
}); 

// display all people
app.get('/people', function(req, res, next) {
	Person.find({}, function(err, result) {
		if (err) {
			console.log(err)
		} else {
			res.send(result);
		}
	});
});

// display one person's friends
app.get('/people/:id', function(req, res, next) {
	Person.findById(req.params.id, function(err, result) {
		if (!err) {
			res.send(result.friends);
		} else {
			throw err;
		}
	});
});

// adding a new person
app.post('/people', function(req, res, next) {
	var person = new Person();
	person.name = req.body.name;
	person.friends = [];
	person.save(function(err, person) {
		if (err) {
			console.log(err);
		} else {
			res.send(person);
		}
	})
});

// adding a friend to a person
app.put('/people/:id', function(req, res, next) {
	Person.findById(req.params.id, function(err, person) {
		person.friends.push(req.body.id);
		person.save(function(err) {
			if (err) {
				console.log(err);
			} else {
				Person.findById(req.body.id, function(err, person) {
					person.friends.push(req.params.id);
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

// removing a person
app.delete('/people/:id', function(req, res, next) {
	Person.findByIdAndRemove(req.params.id, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			res.send("Deleted person with id " + req.params.id);
		}
	});
});
