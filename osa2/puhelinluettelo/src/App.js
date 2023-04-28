import { useState, useEffect } from 'react'
import axios from 'axios'

	const Person = ({person, newFilter}) => {
	if (newFilter.length <= 0)
		return <li>{person.name} {person.number}</li>
	if (person.name.toLowerCase().includes(newFilter.toLowerCase()))
		return <li>{person.name} {person.number}</li>
	}

	const Filter = ({newFilter, handleFilter}) => {
	return (<div>
		filter shown with <input 
			value={newFilter}
			onChange={handleFilter}/>
		</div>)
	}

	const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumber}) => {
	return (
	<form onSubmit={addContact}>
	<div>
		name: <input 
		 value={newName}
		 onChange={handleNameChange}/>
	</div>
	<div>
		number: <input
			value={newNumber}
			onChange={handleNumber}/>
	</div>
	<div>
		<button type="submit">add</button>
	</div>
	</form>
		)
	}

	const Persons = ({id, persons, newFilter}) => {
	return (
		<ul>
		{persons.map(person =>
			<Person key={id += 1} person={person} newFilter={newFilter}/>)}
		</ul>	
	)
	}

const App = () => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNumber] = useState('')
	const [newFilter, setFilter] = useState('')
	const [persons, setPersons] = useState([])

	useEffect(() => {
	axios
		.get('http://localhost:3001/persons')
		.then(response => {
			console.log('Data fetched')
			setPersons(response.data)
			setNewName('')
			setNumber('')
		})
	}, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const addContact = (event) => {
	event.preventDefault()
	if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
		if (newName.length > 0) {
			const personObject = {
				name: newName,
				number: newNumber
			}

			axios
				.post('http://localhost:3001/persons', personObject)
				.then(response =>
					console.log(response))
		} else
			alert(`You have given an empty name`)
	}
	else 
		alert(`${newName} is already added to phonebook`)
	setNewName('')
	setNumber('')
	}

	const handleNumber = (event) => {
		setNumber(event.target.value)
	}

	const handleFilter = (event) => {
		setFilter(event.target.value)
	}

	let id = 0

	return (
	<div>
		<h2>Phonebook</h2>
		<Filter newFilter={newFilter} handleFilter={handleFilter}/>
		<h3>Add a new</h3>
		<PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
		<h3>Numbers</h3>
		<Persons id={id} persons={persons} newFilter={newFilter} />
	</div>
	)

}

export default App
