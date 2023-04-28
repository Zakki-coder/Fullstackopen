import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

	const DeletePerson = ({personDel, persons, setPersons}) => {
			const deletePerson = () => {
				if (window.confirm(`Delete ${personDel.name}?`)){
					phonebook
					.deletePerson(personDel.id)
					.then(response => {
						console.log('response', response.data)
						// USE FILTER INSTEAD OF MAP, map returns undefined with empty array
						const newPersons = persons.filter(person => person.id !== personDel.id)
						console.log('persons after del', newPersons)
						setPersons(newPersons)
					})
				}
			}
		return <button onClick={deletePerson}>delete</button>
	}

	const Person = ({person, newFilter, persons, setPersons}) => {
	if (person && newFilter.length <= 0)
		return <li>{person.name} {person.number} <DeletePerson personDel={person} persons={persons} setPersons={setPersons}></DeletePerson></li>
	if (person && person.name.toLowerCase().includes(newFilter.toLowerCase()))
		return <li>{person.name} {person.number} <DeletePerson personDel={person} persons={persons} setPersons={setPersons}></DeletePerson></li>
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

	const Persons = ({id, persons, newFilter, setPersons}) => {
	return (
		<ul>
		{persons.map(person =>
			<Person key={id += 1} person={person} newFilter={newFilter} persons={persons} setPersons={setPersons}/>)}
		</ul>	
		)
	}

const App = () => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNumber] = useState('')
	const [newFilter, setFilter] = useState('')
	const [persons, setPersons] = useState([])

	useEffect(() => {
		console.log('EFFECT')
		phonebook
			.getAll()
			.then(initialPersons => {
				console.log('Initial data fetched')
				setPersons(initialPersons)
				setNewName('')
				setNumber('')
		})
	}, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const deletePerson = (person) => {
		console.log('delete')
	}

	const addContact = (event) => {
	event.preventDefault()
	//persons map is failing if there is persons object without a name
	if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
		if (newName.length > 0) {
			const personObject = {
				name: newName,
				number: newNumber
			}

			phonebook
				.createPerson(personObject)
				.then(newPerson => {
					console.log(newPerson)
					const newPersons = [...persons, newPerson]
					setPersons(newPersons)
					setNewName('')
					setNumber('')
					})
		} else
			alert(`You have given an empty name`)
	}
	else 
	{
		if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`))
		{
			const personWithOldNumber = persons.find(person => person.name === newName)
			const personWithNewNumber =  {...personWithOldNumber, number: newNumber}
			phonebook.updatePerson(personWithOldNumber.id, personWithNewNumber)
			.then(response => {
				const newPersons = persons.map(person =>
					person.id === response.id ? response : person)
					setPersons(newPersons)
					setNewName('')
					setNumber('')
				})
		}
	}
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
		<Persons id={id} persons={persons} setPersons={setPersons} newFilter={newFilter}/>
	</div>
	)

}

export default App
