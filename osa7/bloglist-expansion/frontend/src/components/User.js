import Notification from './Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    dispatch(setUser(null))
  }

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
