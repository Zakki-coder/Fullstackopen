import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	  ])
	
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  let id = 0

  const handleNameChange = (event) => {
	setNewName(event.target.value)
  }

  const addContact = (event) => {
	event.preventDefault()

	if (!persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
		if (newName.length > 0) {
			setPersons(persons.concat({name: newName, number:newNumber}))
		} else
			alert(`You have given an empty name`)
	}
	else 
		alert(`${newName} is already added to phonebook`)
	setNewName('')
	setNumber('')
  }

  const Person = ({person}) => {
	if (newFilter.length <= 0)
		return <li>{person.name} {person.number}</li>
	if (person.name.toLowerCase().includes(newFilter.toLowerCase()))
		return <li>{person.name} {person.number}</li>
  }

  const handleNumber = (event) => {
	setNumber(event.target.value)
  }

  const handleFilter = (event) => {
	console.log(event.target.value)
	setFilter(event.target.value)
  }

  return (
	<div>
	  <h2>Phonebook</h2>
	  <div>
		filter shown with <input 
			value={newFilter}
			onChange={handleFilter}/>
	  </div>
	  <h2>add new</h2>
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
