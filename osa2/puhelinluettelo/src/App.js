import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: "040-1231244" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  let id = 0

  const handleNameChange = (event) => {
	setNewName(event.target.value)
  }

  const addContact = (event) => {
	event.preventDefault()

	if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
		if (newName.length > 0)
			setPersons(persons.concat({name: newName, number:newNumber}))
		else
			alert(`You have given an empty name`)
	}
	else 
		alert(`${newName} is already added to phonebook`)
  }

  const Person = ({person}) => {
	return <li>{person.name} {person.number}</li>
  }

  const handleNumber = (event) => {
	setNumber(event.target.value)
  }

  return (
	<div>
	  <h2>Phonebook</h2>
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
	  <h2>Numbers</h2>
		<ul>
		{persons.map(person =>
			<Person key={id += 1} person={person}/>)}
		</ul>	
	</div>
  )

}

export default App
