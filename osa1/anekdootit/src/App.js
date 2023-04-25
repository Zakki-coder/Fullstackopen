import { useState } from 'react'

const Button = ({setSelected, anecdotes}) => {
		const NextAnecdote = () => {
			setSelected(Math.floor(Math.random() * 10 % anecdotes.length))	
		}
		return (
			<span>
				<button onClick={NextAnecdote}>next anecdote</button>
			</span>
		)
}

const Vote = ({selected, points, setPoints}) => {
		const AddVote = () => {
			const points_cpy = [...points]
			points_cpy[selected] += 1
			setPoints(points_cpy)
		}
		return (
			<span>
				<button onClick={AddVote}>vote</button>
			</span>
		)
}

function App() {
	const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState(new Uint8Array(8))

	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
		'The only way to go fast, is to go well.'
		]

	  return (
		<div>
			<h1>{anecdotes[selected]}</h1>
			<Vote selected={selected} points={points} setPoints={setPoints}/>
			<Button setSelected={setSelected} anecdotes={anecdotes}/>
			<p>has {points[selected]} points</p>
		</div>
	  )
	}


export default App;
