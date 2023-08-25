import Notification from './Notification'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

export const LoggedInUser = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    dispatch(setUser(null))
  }

  return (
    <>
        {JSON.parse(window.localStorage.loggedUsername)} logged in
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
    </>
  )
}

const User = () => {
  return(
  <div>
    <h2>blog app</h2>
    <Notification />
  </div>
)}

User.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default User
