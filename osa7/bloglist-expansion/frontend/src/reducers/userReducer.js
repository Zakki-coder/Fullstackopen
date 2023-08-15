import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    changeUser(state, action) {
      return action.payload
    }
  }
})

const { changeUser } = userSlice.actions

export const setUser = (user) => {
  return dispatch => {
    dispatch(changeUser(user))
  }
}

export default userSlice.reducer
