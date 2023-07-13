import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = ({ id, content }) => {
    dispatch({ type: 'anecdote/voteAnecdote', payload: id })
    dispatch({ type: 'notification/newVote', payload: content})
    setTimeout(() => dispatch({ type: 'notification/reset' }), 5000)
  }

  const sortter = (a, b) => {
    if (a.votes > b.votes)
      return -1
    if (a.votes < b.votes)
      return 1
    if (a.content > b.content)
      return 1
    if (a.content < b.content)
      return -1
    return 0
  }

  return (
    <div>
      {anecdotes.toSorted(sortter).filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
