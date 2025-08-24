import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};
	const handleFilterChange = (event) => {
		setNewFilter(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		persons.forEach((person) => {
			if (person.name === newName) {
				alert(`${newName} is already in the phonebook`);
				setPersons(persons);
			} else {
				setPersons([
					...persons,
					{
						name: newName,
						number: newNumber,
						id: persons.length + 1,
					},
				]);
			}
		});
		setNewName("");
		setNewNumber("");
	};

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleFilterChange} />
			<PersonForm
				name={newName}
				nameChange={handleNameChange}
				number={newNumber}
				numberChange={handleNumberChange}
				onClick={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons personsList={personsToShow} />
		</div>
	);
};

export default App;
