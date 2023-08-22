import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  console.log('Message:', message)

  if (!message) return null

  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  )
}

export default Notification
