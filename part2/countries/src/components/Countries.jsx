import CountryInfo from "./CountryInfo";

const Countries = ({ countries, country }) => {
	if (countries.length === 0) {
		return null;
	}

	if (countries.length === 1) {
		if (!country) {
			return null;
		}
		return <CountryInfo country={country} />;
	}

	const filteredCountries = countries.map((country) => {
		return <li key={country.name.common}>{country.name.common}</li>;
	});

	return <ul>{filteredCountries}</ul>;
};

export default Countries;
