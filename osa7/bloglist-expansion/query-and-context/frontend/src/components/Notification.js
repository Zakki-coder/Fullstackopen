import { useContext } from 'react'
import NotificationContext, {
  createNotification,
} from '../contexts/notificationContext'

const Notification = () => {
  const [message, setNotification] = useContext(NotificationContext)

  if (!message) return null

  setTimeout(() => {
    setNotification(createNotification(''))
  }, 5000)

  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  )
}

export default Notification
