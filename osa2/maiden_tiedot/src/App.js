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

const Weather = ({country}) => {
	const [weather, setWeather] = useState(null)

	if (country === null)
		return null
	if (!weather)
		maiden_tiedot.getCurrentWeather(country.name.common).then(response => setWeather(response))
	if (weather !== null) {
		return (
			<div>
				<h2>Weather in {country.name.common}</h2>
				temperature {weather.current.temp_c} Celcius
				<br></br>
				<img src={weather.current.condition.icon} style={{ width: '100px', height: 'auto'}}/>
				<br></br>
				wind {(weather.current.wind_kph * 1000/3600).toFixed(2)} m/s
			</div>
		)
	}
	return null
}

const ShowCountry = (showCountry) => {
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
		<Weather country={showCountry}/>
	</div>
	)
}

const MatchingCountries = ({countries, findCountry, showCountry, setShowCountry}) => {
	if (countries === null || findCountry === '')
		return
	if (showCountry !== null) {
		return ShowCountry(showCountry, setShowCountry)
	}

	let names

	const filterCountry = countries.filter(country => country.name.common.toLowerCase().includes(findCountry.toLowerCase()))
	if (filterCountry.length === 1) {
		return ShowCountry(filterCountry[0])
	} else {
		names = filterCountry.map(country => {
			return <li key={country.name.common}>{country.name.common}<button onClick={() => setShowCountry(country)}>show</button></li>
	})
	}
	if (names.length > 10)
		return <div>Too many matches, specify another filter</div>
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
			<MatchingCountries key={id += 1} countries={countries} findCountry={findCountry} showCountry={showCountry} setShowCountry={setShowCountry}/>
		</div>
	)
}

export default App;
