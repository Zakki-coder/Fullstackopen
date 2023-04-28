import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const createPerson = (personObj) => {
	const request = axios.post(baseUrl, personObj)
	return request.then(response => response.data)
}

const deletePerson = (personId) => {
	const request = axios.delete(`${baseUrl}/${personId}`)
	return request.then(response => response)
}

const updatePerson = (personId, updatetPerson) => {
	const request = axios.put(`${baseUrl}/${personId}`, updatetPerson)
	return request.then(response => response.data)
}

export default {
	getAll,
	createPerson,
	deletePerson,
	updatePerson
}