import { useQuery, useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  }
}

//TODO is the rerendering happening by requering from server?? IF so, CHANGE IT!!!
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(newAnecdote)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = createAnecdote(content)
    newAnecdoteMutation.mutate(anecdote, {
     onSuccess: () => {
       const notes = queryClient.getQueryData('anecdotes')
       queryClient.setQueryData('anecdotes', notes.concat(anecdote))
      }
    })
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
