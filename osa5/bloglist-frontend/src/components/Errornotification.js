const ErrorNotification = ({ message, setError }) => {
  if (!message)
    return null

  setTimeout(() => {
    setError(null)
  }, 5000)

  return (
    <div>
      <h2 className="errornotification">{message}</h2>
    </div>
  )
}

  export default ErrorNotification

