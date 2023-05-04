import { useEffect, useState } from 'react'
import maiden_tiedot from './services/maiden_tiedot'

const Find = ({findCountry, findCountryEvent}) => {
	return (
	<div>
		find countries <input
			value={findCountry}
			onChange={findCountryEvent}
		/>
	</div>
	)
}

const ShowCountry = (showCountry, setShowCountry) => {
	if (showCountry === null)
		return
	const country = showCountry
	let id = 0
	const languages = Object.values(country.languages).map(language => {
		return <li key={id += 1}>{language}</li>
	})
	return (
		<div>
		<h1>{country.name.common}</h1>
		capital {country.capital}<br></br>
		area {country.area}
		<h2>languages:</h2>
		<ul>
			{languages}
		</ul>
		<img src={country.flags.svg} style={{ width: '200px', height: 'auto' }}/>
	</div>
	)
}

const MatchingCountries = ({countries, findCountry, setFindCountry, showCountry, setShowCountry}) => {
	if (countries === null || findCountry === null)
		return
	if (showCountry !== null) {
		return ShowCountry(showCountry, setShowCountry)
	}
	let lol = null
	const filterCountry = countries.filter(country => country.name.common.toLowerCase().includes(findCountry.toLowerCase()))
	const names = filterCountry.map(country => {
		return <li key={country.name.common}>{country.name.common}<button onClick={() => setShowCountry(country)}>show</button></li>
	})
	if (names.length > 10)
		return <div>Too many matches, specify another filter</div>
	if (filterCountry.length === 1) {
		// setShowCountry(filterCountry[0])
		return ShowCountry(filterCountry[0])
	}
	return (
		<div>
			<ul>
				{names}
			</ul>
		</div>
	)
}

function App() {
	const [countries, setCountries] = useState(null)
	const [findCountry, setFindCountry] = useState('')
	const [showCountry, setShowCountry] = useState(null)

	const findCountryEvent = (event) => {
		setFindCountry(event.target.value)
		setShowCountry(null)
	}

	useEffect(() => {
		maiden_tiedot
		.getAll()
		.then(response => {
			setCountries(response)
		})
	}, [])

	let id = 0
	return (
		<div>
			<Find findCountry={findCountry} findCountryEvent={findCountryEvent}/>
			<MatchingCountries key={id += 1} countries={countries} findCountry={findCountry} setFindCountry={setFindCountry} showCountry={showCountry} setShowCountry={setShowCountry}/>
			{/* <ShowCountry setShowCountry={setShowCountry} showCountry={showCountry}/> */}
		</div>
	)
}

export default App;
