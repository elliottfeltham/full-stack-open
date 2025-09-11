const CountryInfo = ({ country }) => {
	const languages = Object.entries(country.languages);

	return (
		<div>
			<h2 className="title">{country.name.common}</h2>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h3 className="languages">Languages</h3>
			<ul>
				{languages.map((lang) => {
					return <li key={lang[0]}>{lang[1]}</li>;
				})}
			</ul>
			<img
				className="flag"
				src={country.flags.png}
				alt="Picture of flag"
			/>
		</div>
	);
};

export default CountryInfo;
