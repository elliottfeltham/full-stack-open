import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [newFilter, setNewFilter] = useState("");
	const [notification, setNotification] = useState(null);

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
		const name = newName.trim();
		const number = newNumber.trim();

		if (!name || !number) {
			return;
		}

		const newPerson = {
			name,
			number,
		};

		const exists = persons.some(
			(person) => person.name.toLowerCase() === name.toLowerCase()
		);

		// Check if person already exists
		if (exists) {
			const ok = window.confirm(
				`${name} is already in the phonebook, would you like to update their number with the new one?`
			);
			if (!ok) return;

			// Find the correct person and update their number
			const selectedPerson = persons.find(
				(person) => person.name === name
			);
			const updatedContact = { ...selectedPerson, number };

			// Edit the number of the selected person in the backend
			phonebookService
				.update(selectedPerson.id, updatedContact)
				.then((response) => {
					setPersons(
						persons.map((person) =>
							person.id === selectedPerson.id
								? response.data
								: person
						)
					);
					setNewName("");
					setNewNumber("");
				})
				.catch((error) => {
					console.error("Failed to update contact", error);
					alert("Failed to update contact");
				});
			return;
		}

		// Add person to the backend and use the response to update the UI
		phonebookService
			.create(newPerson)
			.then((response) => {
				const savedPerson = response.data;
				setPersons([...persons, savedPerson]);
				setNewName("");
				setNewNumber("");
				setNotification(`${name} successfully added to phonebook`);
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			})
			.catch((error) => {
				console.error("Failed to add contact", error);
				alert("Failed to add contact");
			});
	};

	const personsToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase())
	);

	const deleteContact = (contact) => {
		const ok = window.confirm(`Delete ${contact.name}?`);
		if (!ok) return;

		phonebookService
			.deleteContact(contact.id)
			.then(() =>
				setPersons(persons.filter((person) => person.id !== contact.id))
			)
			.catch((error) => {
				console.error("Failed to delete contact", error);
				alert("Failed to delete contact");
			});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification} />
			<Filter value={newFilter} onChange={handleFilterChange} />
			<PersonForm
				name={newName}
				nameChange={handleNameChange}
				number={newNumber}
				numberChange={handleNumberChange}
				onClick={addPerson}
			/>
			<h2>Numbers</h2>
			<Persons
				personsList={personsToShow}
				deleteContact={deleteContact}
			/>
		</div>
	);
};

export default App;
