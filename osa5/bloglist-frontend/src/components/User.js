import Notification from './Notification'
import PropTypes from 'prop-types'

const User = ({  handleLogout, notification, setNotification }) => (
  <div>
    <h2>blogs</h2>
    <Notification message={notification} setNotification={setNotification}/>
    <p>{JSON.parse(window.localStorage.loggedUsername)} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  </div>
)

User.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default User
