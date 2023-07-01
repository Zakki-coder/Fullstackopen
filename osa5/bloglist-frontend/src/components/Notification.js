import PropTypes from 'prop-types'

const Notification = ({ message, setNotification }) => {
  if (!message)
    return null

  setTimeout(() => {
    setNotification('')
  }, 5000)

  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Notification
