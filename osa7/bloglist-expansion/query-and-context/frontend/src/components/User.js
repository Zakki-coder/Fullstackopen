import Notification from './Notification'

const User = ({ handleLogout }) =>
{
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <p>{JSON.parse(window.localStorage.loggedUsername)} logged in
        <button id='logout-button' onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default User
