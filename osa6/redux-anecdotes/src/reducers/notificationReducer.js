import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    reset(state, action) {
      return ''
    },
  }
})

export const { newVote, reset } = notificationSlice.actions

//Spamming notification made it buggy, this fixes it.
var prevTimeout

export const setNotification = (content, timeout) => {
  const { newNotification } = notificationSlice.actions
  return dispatch => {
    clearTimeout(prevTimeout)
    dispatch(newNotification(content))
    prevTimeout = setTimeout(() => {
      dispatch(reset())
      prevTimeout = null
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer
