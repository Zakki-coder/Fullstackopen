import axios from 'axios'

const endPointUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
	const request = axios.get(endPointUrl)
	return request.then(response => response.data)
}

const getCurrentWeather = (city) => {
	const request = axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`)
	return request.then(response => response.data)
}

export default {
	getAll,
	getCurrentWeather
}