import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = (anecdote) => {
  console.log(anecdote)
  axios.post(baseUrl, anecdote).then(response => {
    console.log('RESP', response)
    return response.data
  }).catch(err => {
    console.log('WTF ERROR', err)
  })
}

export { getAll, newAnecdote }

