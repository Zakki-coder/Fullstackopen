import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  console.log('action', action)
  console.log('state', state)
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const setNotification = (notification) => {
  return {
    type: 'SET',
    payload: notification
  }
}

export default NotificationContext
