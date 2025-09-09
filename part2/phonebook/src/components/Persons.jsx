import Person from "./Person";

const Persons = ({ personsList, deleteContact }) => {
	return (
		<ul>
			{personsList.map((person) => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					handleClick={() => deleteContact(person)}
				/>
			))}
		</ul>
	);
};

export default Persons;
