import Notification from './Notification'
import PropTypes from 'prop-types'

const User = ({ handleLogout }) => {
  return(
  <div>
    <h2>blogs</h2>
    <Notification />
    <p>
      {JSON.parse(window.localStorage.loggedUsername)} logged in
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </p>
  </div>
)}

User.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default User
