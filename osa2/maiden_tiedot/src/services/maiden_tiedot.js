import axios from 'axios'

const endPointUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
	const request = axios.get(endPointUrl)
	return request.then(response => response.data)
}

export default {
	getAll
}