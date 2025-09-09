import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");

	useEffect(() => {
		phonebookService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

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
		const name = newName;
		const number = newNumber;

		const newPerson = {
			name,
			number,
		};

		// Check if person already exists
		if (
			persons.some(
				(person) => person.name.toLowerCase() === name.toLowerCase()
			)
		) {
			alert("Name already exists");
			return;
		}

		// Add person to the backend and use the response to update the UI
		phonebookService.create(newPerson).then((response) => {
			const savedPerson = response.data;
			setPersons([...persons, savedPerson]);
			setNewName("");
			setNewNumber("");
		});
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
