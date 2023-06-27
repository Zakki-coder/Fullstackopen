const Notification = ({ message, setNotification}) => {
  if (!message)
    return null

  setTimeout(() => {
    setNotification(null)
  }, 5000)

  return (
    <div className='Notification'>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification
