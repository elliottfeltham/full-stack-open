const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

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
	response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
	const id = request.params.id;
	const person = persons.find((p) => p.id === id);

	if (person) {
		response.json(person);
	} else {
		response.status(404).end();
	}
});

app.post("/api/persons", (req, res) => {
	const body = req.body;
	const id = Math.floor(Math.random() * 1000);

	if (!body.name) {
		return res.status(400).json({ error: "name is missing" });
	}

	if (!body.number) {
		return res.status(400).json({ error: "number is missing" });
	}

	if (persons.some((p) => p.name === body.name)) {
		return res.status(400).json({ error: "name already exists" });
	}

	const person = {
		id: String(id),
		name: body.name,
		number: body.number,
	};

	persons = [...persons, person];

	res.json(person);
	console.log(body);
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

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
