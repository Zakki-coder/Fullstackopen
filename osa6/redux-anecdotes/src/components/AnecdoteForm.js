import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
      event.preventDefault()
      dispatch({ type: 'anecdote/newAnecdote', payload: event.target.anecdote.value })
      dispatch({ type: 'notification/newAnecdote', payload: event.target.anecdote.value })
      setTimeout(() => dispatch({ type: 'notification/reset', payload: '' }), 5000)
      event.target.reset()
    }
 
    return(
    <div>
      <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input type='text' name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm
