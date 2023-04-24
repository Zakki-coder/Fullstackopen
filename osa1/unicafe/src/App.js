import { useState } from 'react'

const Statistics = ({value, text}) => {
	return <p>{text} {value}</p>
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
		<Statistics value={good} text="good" />
		<Statistics value={neutral} text="neutral"/>
		<Statistics value={bad} text="bad"/>
    </div>
  )
}

export default App
