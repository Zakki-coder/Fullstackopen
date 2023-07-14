import { useDispatch } from 'react-redux'
import { newAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
      event.preventDefault()
      dispatch(newAnecdote(event.target.anecdote.value))
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
