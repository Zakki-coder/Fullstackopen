import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
      event.preventDefault()
      console.log('a new exciting anecdote', event.target.anecdote.value)
      dispatch(createAnecdote(event.target.anecdote.value))
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
