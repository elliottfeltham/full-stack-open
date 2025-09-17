require("dotenv").config();
const express = require("express");
const Contact = require("./models/contacts");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

// Logging middleware using "morgan"
const morgan = require("morgan");

morgan.token("person", (req, res) => {
	return JSON.stringify(req.body);
});

app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :person"
	)
);

// Phonebook data
let persons = [
	{
		id: "1",
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: "2",
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: "3",
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: "4",
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
];

// Routes
app.get("/", (request, response) => {
	response.send(`Go to "/api/persons" or "/info"`);
});

app.get("/api/persons", (request, response) => {
	Contact.find({}).then((person) => {
		response.json(person);
	});
});

app.get("/api/persons/:id", (request, response) => {
	Contact.findById(request.params.id).then((person) => {
		response.json(person);
	});
});

app.post("/api/persons", (req, res) => {
	const body = req.body;

	if (!body.name) {
		return res.status(400).json({ error: "name is missing" });
	}

	if (!body.number) {
		return res.status(400).json({ error: "number is missing" });
	}

	const contact = new Contact({
		name: body.name,
		number: body.number,
	});

	contact.save().then((newContact) => {
		res.json(newContact);
	});
});

app.delete("/api/persons/:id", (req, res) => {
	const id = req.params.id;
	persons = persons.filter((p) => p.id !== id);

	res.status(204).end();
});

app.get("/info", (request, response) => {
	const date = new Date();
	response.send(
		`Phonebook has info for ${persons.length} people <br>
		${date.toString()}`
	);
});

// Middleware function which runs if the route doesn't exist
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// Sets port to either Render's PORT or localhost:3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
