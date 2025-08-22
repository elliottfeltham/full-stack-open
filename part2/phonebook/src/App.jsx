import { useState } from "react";

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
	};

	const numbersToShow = persons.filter((person) =>
		person.name.toLowerCase().includes(newFilter.toLowerCase())
	);

	console.table(persons);
	return (
		<div>
			<h2>Phonebook</h2>
			<p>
				filter shown with:{" "}
				<input value={newFilter} onChange={handleFilterChange} />
			</p>
			<form>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number:{" "}
					<input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit" onClick={addPerson}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{numbersToShow.map((person) => {
					return (
						<li
							key={person.name}
						>{`${person.name}: ${person.number}`}</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
