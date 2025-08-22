import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleInputChange = (event) => {
		setNewName(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		setPersons([...persons, { name: newName }]);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleInputChange} />
				</div>
				<div>
					<button type="submit" onClick={addPerson}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => {
					return <li key={person.name}>{person.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default App;
