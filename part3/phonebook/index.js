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

// Error handling
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	// Failed promise due to MongoDB ObjectID requiring 24 digit hex
	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" });
	}

	next(error);
};

// Routes
app.get("/", (request, response) => {
	response.send(`Go to "/api/persons" or "/info"`);
});

app.get("/api/persons", (request, response) => {
	Contact.find({}).then((person) => {
		response.json(person);
	});
});

app.get("/api/persons/:id", (request, response, next) => {
	Contact.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				// Successful promise returned but no ID found
				response.status(404).end();
			}
		})
		.catch((error) => {
			next(error);
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

app.put("/api/persons/:id", (req, res, next) => {
	console.log("Content-Type:", req.headers["content-type"]);
	console.log("Body:", req.body);
	const body = req.body;

	Contact.findById(req.params.id)
		.then((person) => {
			if (!person) {
				return res.status(404).end();
			}

			person.name = body.name;
			person.number = body.number;

			return person.save().then((updatedContact) => {
				res.json(updatedContact);
			});
		})
		.catch((error) => {
			next(error);
		});
});

app.delete("/api/persons/:id", (req, res, next) => {
	Contact.findByIdAndDelete(req.params.id)
		.then((result) => {
			res.status(204).end();
		})
		.catch((error) => {
			next(error);
		});
});

app.get("/info", (request, response, next) => {
	const date = new Date();

	Contact.estimatedDocumentCount()
		.then((count) => {
			response.send(
				`Phonebook has info for ${count} people <br>
					${date.toString()}`
			);
		})
		.catch((error) => next(error));
});

// Middleware function which runs if the route doesn't exist
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(errorHandler);

// Sets port to either Render's PORT or localhost:3001
const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
