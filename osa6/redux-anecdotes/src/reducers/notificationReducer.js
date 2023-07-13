import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newAnecdote(state, action) {
      return `You added a new exciting anecdote '${action.payload}'`
    },
    newVote(state, action) {
      return `You voted '${action.payload}'`
    },
    reset(state, action) {
      return ''
    },
  }
})

export const { newAnecdote, newVote, reset } = notificationSlice.actions
export default notificationSlice.reducer
