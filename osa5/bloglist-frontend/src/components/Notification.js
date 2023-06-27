const Notification = ({ message, setNotification}) => {
  if (!message)
    return null

  setTimeout(() => {
    setNotification(null)
  }, 5000)

  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  )
}

export default Notification
