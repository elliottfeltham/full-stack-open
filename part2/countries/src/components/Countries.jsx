const Countries = ({ countries, country }) => {
	const filteredCountries = countries.map((country) => {
		return <p key={country.name.common}>{country.name.common}</p>;
	});
	return (
		<ul>
			{filteredCountries.length > 1
				? filteredCountries
				: JSON.stringify(country, null, 2)}
		</ul>
	);
};

export default Countries;
