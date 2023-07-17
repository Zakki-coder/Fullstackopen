import { useMutation, useQueryClient } from 'react-query'
import { newAnecdote } from '../services/anecdotes'
import { useNotificationDispatch } from '../NotificationContext'

const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdote = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0
  }
}

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(newAnecdote)
  const setNotification = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = createAnecdote(content)
    newAnecdoteMutation.mutate(anecdote, {
      onSuccess: () => {
        setNotification({ type: 'UPDATE', payload: `you added '${anecdote.content}'` })
        setTimeout(() => setNotification({ type: 'RESET' }), 5000)
        const notes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', notes.concat(anecdote))
      },
      onError: () => {
        setNotification({ type: 'UPDATE', payload: 'too short anecdote, must have length 5 or more' })
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
