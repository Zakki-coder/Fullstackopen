import { useState } from 'react'

const Statistics = ({value, text}) => {
	return <span>{text} {value}<br></br></span>
  }

const Button = ({handleClick, text}) => {
	return <button onClick={handleClick}>{text}</button>
}

const Average = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	let average = 0
	let positives = 0

	if (all != 0) {
		average = (good - bad) / all
		positives = good / all * 100
	}

	return (
		<span>
			average {average}
			<br></br>
			positive {positives}
		</span>
		)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
		<h1>give feedback</h1>
		<Button handleClick={() => setGood(good + 1)} text="good" />
		<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
		<Button handleClick={() => setBad(bad + 1)} text="bad" />
		<h1>statistics</h1>
		<Statistics value={good} text="good" />
		<Statistics value={neutral} text="neutral"/>
		<Statistics value={bad} text="bad"/>
		<span>all {good + neutral + bad}<br></br></span>
		<Average good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
