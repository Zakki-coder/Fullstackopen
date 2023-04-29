import { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

	const DeletePerson = ({personDel, persons, setPersons, setNotification}) => {
			const deletePerson = () => {
				if (window.confirm(`Delete ${personDel.name}?`)){
					phonebook
					.deletePerson(personDel.id)
					.then(response => {
						// USE FILTER INSTEAD OF MAP, map returns undefined with empty array
						const newPersons = persons.filter(person => person.id !== personDel.id)
						setPersons(newPersons)
						updateNotification(`${personDel.name} deleted`, setNotification)
					})
				}
			}
		return <button onClick={deletePerson}>delete</button>
	}

	const Person = ({person, newFilter, persons, setPersons, setNotification}) => {
	if (person && newFilter.length <= 0)
		return <li>{person.name} {person.number} <DeletePerson personDel={person} persons={persons} setPersons={setPersons} setNotification={setNotification}></DeletePerson></li>
	if (person && person.name.toLowerCase().includes(newFilter.toLowerCase()))
		return <li>{person.name} {person.number} <DeletePerson personDel={person} persons={persons} setPersons={setPersons} setNotification={setNotification}></DeletePerson></li>
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

	const Persons = ({id, persons, newFilter, setPersons, setNotification}) => {
	return (
		<ul>
		{persons.map(person =>
			<Person key={id += 1} person={person} newFilter={newFilter} persons={persons} setPersons={setPersons} setNotification={setNotification}/>)}
		</ul>	
		)
	}

	const Notification = ({newNotification}) => {
		if (newNotification === null)
			return null
		return <div className="notification">{newNotification}</div>
	}

	const updateNotification = (message, setNotification) => {
			setNotification(`${message}`)
			setTimeout(() => {
				setNotification(null)
			}, 5000)
	}

	const Error = ({newError}) => {
		if (newError === null)
			return
		return <div className="error">{newError}</div>
	}

	const updateError = (message, setError) => {
		setError(message)
		setTimeout(() => {
			setError(null)
		}, 5000)
	}

const App = () => {
	const [newName, setNewName] = useState('')
	const [newNumber, setNumber] = useState('')
	const [newFilter, setFilter] = useState('')
	const [persons, setPersons] = useState([])
	const [newNotification, setNotification] = useState(null)
	const [newError, setError] = useState(null)

	const updatePersons = () => {
			phonebook
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
				setNewName('')
				setNumber('')
		})	
	}

	useEffect(() => {
		updatePersons()
	}, [])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
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
					const newPersons = [...persons, newPerson]
					setPersons(newPersons)
					setNewName('')
					setNumber('')
					updateNotification(`Added ${newPerson.name}`, setNotification)
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
			const newNameBk = newName
			phonebook.updatePerson(personWithOldNumber.id, personWithNewNumber)
			.then(response => {
				const newPersons = persons.map(person =>
					person.id === response.id ? response : person)
					setPersons(newPersons)
					updateNotification(`Updated ${newNameBk}'s number`, setNotification)
					setNewName('')
					setNumber('')
				})
				.catch(response => {
					updateError(`Information of ${newNameBk} has already been removed from server`, setError)
					setNewName('')
					setNumber('')
					updatePersons()
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
		<Notification newNotification={newNotification}/>
		<Error newError={newError}/>
		<Filter newFilter={newFilter} handleFilter={handleFilter}/>
		<h3>Add a new</h3>
		<PersonForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumber={handleNumber} />
		<h3>Numbers</h3>
		<Persons id={id} persons={persons} setPersons={setPersons} newFilter={newFilter} setNotification={setNotification}/>
	</div>
	)

}

export default App
