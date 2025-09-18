const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

// Connect to the database
console.log("Connecting to database");
mongoose
	.connect(url)
	.then((result) => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB:", error.message);
	});

// Set the database schema
const contactSchema = new mongoose.Schema({
	name: { type: String, minLength: 3, required: true },
	number: String,
});

// Format the returned JSON from MongoDB
contactSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Contact", contactSchema);
