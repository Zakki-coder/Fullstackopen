import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
	return (
	<span>
		{text} {value}
	</span>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	const average = (good - bad) / all
	const positives = good / all * 100

	if (all != 0)
		return (
			<div> 
				<StatisticsLine text="good" value={good} /><br></br>
				<StatisticsLine text="neutral" value={neutral} /><br></br>
				<StatisticsLine text="bad" value={bad} /><br></br>
				<StatisticsLine text="all" value={all} /><br></br>
				<StatisticsLine text="average" value={average} /><br></br>
				<StatisticsLine text="positive" value={positives} /><span>%</span>
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
