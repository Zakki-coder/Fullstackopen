import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = (anecdote) => {
  return axios.post(baseUrl, anecdote).then(response => response.data)
}

const updateAnecdote = (anecdote) => {
  const id = anecdote.id
  return axios.put(`${baseUrl}/${id}`, anecdote).then(response => response.data)
}

export { getAll, newAnecdote, updateAnecdote }

