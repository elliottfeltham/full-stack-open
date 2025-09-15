const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

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
	const id = Math.floor(Math.random() * 1000);

	const person = req.body;
	person.id = String(id);

	persons = persons.concat(person);
	res.json(person);
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

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
