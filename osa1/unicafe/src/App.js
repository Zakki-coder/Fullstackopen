import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
	return (
		<tbody>
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		</tbody>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const all = good + neutral + bad
	const average = (good - bad) / all
	const positives = good / all * 100

	if (all != 0)
		return (
			<table> 
					<StatisticsLine text="good" value={good} />
					<StatisticsLine text="neutral" value={neutral} />
					<StatisticsLine text="bad" value={bad} />
					<StatisticsLine text="all" value={all} />
					<StatisticsLine text="average" value={average} />
					<StatisticsLine text="positive" value={positives + " %"}/>
			</table>
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
