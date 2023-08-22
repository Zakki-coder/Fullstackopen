import PropTypes from 'prop-types'

const ErrorNotification = ({ message, setError }) => {
  if (!message)
    return null

  setTimeout(() => {
    setError('')
  }, 5000)

  return (
    <div>
      <h2 className="errornotification">{message}</h2>
    </div>
  )
}

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

export default ErrorNotification

