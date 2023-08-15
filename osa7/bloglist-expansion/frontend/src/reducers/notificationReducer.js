import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const newNotification = (payload) => {
  const { setNotification } = notificationSlice.actions
  return dispatch => {
    setTimeout(() => {
      dispatch(setNotification(''))
    }, 5000)
    dispatch(setNotification(payload))
  }
}

export default notificationSlice.reducer
