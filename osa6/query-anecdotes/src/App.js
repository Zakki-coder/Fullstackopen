import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, updateAnecdote } from './services/anecdotes'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const App = () => {
  const updateAnecdoteMutation = useMutation(updateAnecdote)
  const queryClient = useQueryClient()
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote,
      {
        onSuccess: () => {
          const anecdoteList = queryClient.getQueryData('anecdotes')
          queryClient.setQueryData('anecdotes', anecdoteList.map(anecdote => {
            if (anecdote.id === updatedAnecdote.id)
              return updatedAnecdote
            return anecdote
          })
        )}
      })
  }

  const result = useQuery(
    'anecdotes',
    getAll
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data 

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
