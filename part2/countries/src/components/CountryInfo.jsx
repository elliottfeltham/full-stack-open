const CountryInfo = ({ country, weather }) => {
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
			{weather && (
				<section>
					<h3>Weather in {country.capital}</h3>
					<p>Temperature: {weather.main.temp} Celsius</p>
					<img
						className="weather-logo"
						src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
						alt="Weather icon"
					/>
					<p>Wind: {weather.wind.speed} m/s</p>
				</section>
			)}
		</div>
	);
};

export default CountryInfo;
