import CountryInfo from "./CountryInfo";

const Countries = ({ countries, country, handleClick }) => {
	if (countries.length === 0) {
		return null;
	}

	if (countries.length === 1) {
		if (!country) {
			return null;
		}
	}

	if (country) {
		return <CountryInfo country={country} />;
	}

	const filteredCountries = countries.map((country) => {
		return (
			<li key={country.name.common}>
				{country.name.common}
				<button onClick={() => handleClick(country.name.common)}>
					Show
				</button>
			</li>
		);
	});

	return <ul>{filteredCountries}</ul>;
};

export default Countries;
