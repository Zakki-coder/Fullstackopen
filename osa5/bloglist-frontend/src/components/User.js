import Notification from './Notification'

const user = ({  handleLogout, notification, setNotification }) => (
   <div>
     <h2>blogs</h2>
      <Notification message={notification} setNotification={setNotification}/>
    <p>{JSON.parse(window.localStorage.loggedUsername)} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
  </div>
)

export default user
