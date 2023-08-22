import ErrorNotification from './Errornotification'
import PropTypes from 'prop-types'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'

const Login = ({
  userCredentials,
  setCredentials,
  errorMessage,
  setError,
}) => {
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.userLogin(userCredentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response))
      window.localStorage.setItem(
        'loggedUsername',
        JSON.stringify(userCredentials.username),
      )
      dispatch(setUser(response))
      setCredentials({ username: '', password: '' })
    } catch (exception) {
      setError('wrong username or password')
    }
  }

  return (
  <div>
    <h2>Login to application</h2>
    <ErrorNotification message={errorMessage} setError={setError} />
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={userCredentials.username}
          name="Username"
          onChange={({ target }) =>
            setCredentials({ ...userCredentials, username: target.value })
          }
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={userCredentials.password}
          name="Password"
          onChange={({ target }) =>
            setCredentials({ ...userCredentials, password: target.value })
          }
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  </div>
)}

Login.propTypes = {
  userCredentials: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  errorMessage: PropTypes.string.isRequired,
  setCredentials: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Login
