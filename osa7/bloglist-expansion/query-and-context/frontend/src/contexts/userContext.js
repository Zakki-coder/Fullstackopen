import { createContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer)

  return (
    <div>
      <UserContext.Provider value={[user, userDispatch]}>
        {props.children}
      </UserContext.Provider>
    </div>
  )
}

export const setUser = (user) => {
  return {
    type: 'SET',
    payload: user,
  }
}

export default UserContext
