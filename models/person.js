const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new Schema: specify the types of objects that will be stored in our db
const PersonSchema = new Schema({
	name: String,
	dog: String,
	friends: [ Schema.ObjectId ] // Friends is a list of IDs (references to other entries)
});

const Person = mongoose.model("person", PersonSchema);

module.exports = Person; // Export the schema so it can be accessed in App.js