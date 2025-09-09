const Person = ({ name, number, handleClick }) => {
	return (
		<li>
			{name}: {number} <button onClick={handleClick}>Delete</button>
		</li>
	);
};

export default Person;
