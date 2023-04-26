import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
	{ name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  let id = 0

  const handleNameChange = (event) => {
	setNewName(event.target.value)
  }

  const addContact = (event) => {
	event.preventDefault()
	console.log('Button click', event.target)
	setPersons(persons.concat({name: newName}))
  }

  const Person = ({person}) => {
	return <li>{person.name}</li>
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
