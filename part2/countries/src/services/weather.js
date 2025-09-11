import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const getWeather = (city, apiKey) => {
	return axios.get(`${baseUrl}${city}&appid=${apiKey}&units=metric`);
};

export default { getWeather };
