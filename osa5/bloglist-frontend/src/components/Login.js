import ErrorNotification from './Errornotification'

const login = ({ userCredentials, handleLogin, setCredentials, errorMessage, setError }) => (
    <div>
      <h2>Login to application</h2>
      <ErrorNotification message={errorMessage} setError={setError}/>
      <form onSubmit={handleLogin}>
        <div>
          username
           <input
           type="text"
           value={userCredentials.username}
           name="Username"
           onChange={({ target }) => setCredentials({ ...userCredentials, username: target.value })}
          />
        </div>
        <div>
          password
            <input
              type="password"
              value={userCredentials.password}
              name="Password"
              onChange={({ target }) => setCredentials({ ...userCredentials, password: target.value })}
              />
        </div>
        <button type="submit">login</button>
        </form>
    </div>
)

export default login
