import React from "react";

const Search = ({ label, value, handleChange }) => {
	return (
		<>
			<label>{label}: </label>
			<input value={value} onChange={handleChange}></input>
		</>
	);
};

export default Search;
