import ErrorNotification from './Errornotification'
import PropTypes from 'prop-types'

const Login = ({ userCredentials, handleLogin, setCredentials, errorMessage, setError }) => (
  <div>
    <h2>Login to application</h2>
    <ErrorNotification message={errorMessage} setError={setError}/>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={userCredentials.username}
          name="Username"
          onChange={({ target }) => setCredentials({ ...userCredentials, username: target.value })}
        />
      </div>
      <div>
      password
        <input
          id='password'
          type="password"
          value={userCredentials.password}
          name="Password"
          onChange={({ target }) => setCredentials({ ...userCredentials, password: target.value })}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  </div>
)

Login.propTypes = {
  userCredentials: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  handleLogin: PropTypes.func.isRequired,
  setCredentials: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

export default Login
