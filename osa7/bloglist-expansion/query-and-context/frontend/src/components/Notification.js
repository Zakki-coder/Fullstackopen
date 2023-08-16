import { useContext } from 'react'
import NotificationContext from '../reducers/notificationReducer'

const Notification = () => {
  const context = useContext(NotificationContext)
  const message = context[0]
  console.log('Message:', message)

  if (!message) return null

  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  )
}

export default Notification
