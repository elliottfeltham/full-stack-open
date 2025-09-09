import Person from "./Person";

const Persons = ({ personsList }) => {
	return (
		<ul>
			{personsList.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
				/>
			))}
		</ul>
	);
};

export default Persons;
