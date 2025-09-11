import { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
	const [newSearch, setNewSearch] = useState("");
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState(null);

	// Fetch list of countries
	useEffect(() => {
		countriesService.getAll().then((response) => {
			setCountries(response.data);
		});
	}, []);

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value);
	};

	// Filter through countries dynamically
	const countriesList = countries.filter((country) => {
		return country.name.common
			.toLowerCase()
			.includes(newSearch.toLowerCase());
	});

	// Fetch selected country
	const selectedCountry =
		countriesList.length === 1 ? countriesList[0].name.common : null;

	useEffect(() => {
		if (selectedCountry) {
			countriesService.getCountry(selectedCountry).then((response) => {
				setCountry(response.data);
			});
		} else {
			setCountry(null);
		}
	}, [selectedCountry]);

	return (
		<div className="container">
			<h1>Countries</h1>
			<Search
				label={"Find countries"}
				value={newSearch}
				handleChange={handleSearchChange}
			/>
			{countriesList.length < 10 ? (
				<Countries countries={countriesList} country={country} />
			) : (
				newSearch && (
					<p>Too many matches, please specify another filter</p>
				)
			)}
		</div>
	);
};

export default App;
