import { useState, useEffect } from "react";
import Search from "./components/Search";
import Countries from "./components/Countries";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

const App = () => {
	const [newSearch, setNewSearch] = useState("");
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState(null);
	const [weather, setWeather] = useState(null);

	// Fetch list of countries
	useEffect(() => {
		countriesService.getAll().then((response) => {
			setCountries(response.data);
		});
	}, []);

	// Fetch weather info for displayed country
	useEffect(() => {
		const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

		if (!country) {
			return;
		}

		weatherService
			.getWeather(country.capital, OPENWEATHER_API_KEY)
			.then((response) => {
				setWeather(response.data);
			});
	}, [country]);

	const handleSearchChange = (event) => {
		setNewSearch(event.target.value);
		setCountry(null); // Reset country everytime to avoid cached country bug while searching
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

	const showCountryInfo = (name) => {
		countriesService.getCountry(name).then((response) => {
			setCountry(response.data);
		});
	};

	return (
		<div className="container">
			<h1>Countries</h1>
			<Search
				label={"Find countries"}
				value={newSearch}
				handleChange={handleSearchChange}
			/>
			{countriesList.length < 10 ? (
				<Countries
					countries={countriesList}
					country={country}
					weather={weather}
					handleClick={showCountryInfo}
				/>
			) : (
				newSearch && (
					<p>Too many matches, please specify another filter</p>
				)
			)}
		</div>
	);
};

export default App;
