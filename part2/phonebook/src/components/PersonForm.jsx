const PersonForm = (props) => {
	return (
		<form>
			<div>
				name: <input value={props.name} onChange={props.nameChange} />
			</div>
			<div>
				number:{" "}
				<input value={props.number} onChange={props.numberChange} />
			</div>
			<div>
				<button type="submit" onClick={props.onClick}>
					add
				</button>
			</div>
		</form>
	);
};

export default PersonForm;
