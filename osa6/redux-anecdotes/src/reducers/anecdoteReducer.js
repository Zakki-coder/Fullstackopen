import { createSlice } from '@reduxjs/toolkit'
import { setNotification } from './notificationReducer'
import anecdoteService from './../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    vote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          const newAnecdote = {
            ...anecdote,
            votes: anecdote.votes + 1
          }
          return newAnecdote
        }
        return anecdote
      })
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const voteAnecdote = (id, content) => {
  const { vote } = anecdotesSlice.actions
  return async (dispatch, getState) => {
    const state = getState()
    const anecdote = state.anecdote.find(anecdote => anecdote.id === id)
    anecdoteService.put(id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(vote(id))
    dispatch(setNotification(`you voted '${content}'`, 5))
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.post(asObject(content))
    dispatch(appendAnecdote(anecdote))
    dispatch(setNotification(`you added '${anecdote.content}'`, 5))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdoteService.getAll()
    dispatch(setAnecdotes(response))
  }
}

export default anecdotesSlice.reducer
