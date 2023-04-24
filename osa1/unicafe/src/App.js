import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	const average = (good - bad) / all
	const positives = good / all * 100

	if (all != 0)
		return (
			<div> 
				good {good}<br></br>
				neutral {neutral}<br></br>
				bad {bad}<br></br>
				all {good + neutral + bad}<br></br>
				average {average}
				<br></br>
				positive {positives}%
			</div>
		)
	return (
		<div>
			No feedback given
		</div>
	)
  }

const Button = ({handleClick, text}) => {
	return <button onClick={handleClick}>{text}</button>
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
		<Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
