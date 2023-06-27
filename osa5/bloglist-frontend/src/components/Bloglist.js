import Notification from './Notification'

const bloglist = ({ handleLogout, notification, setNotification }) => (
   <div>
     <h2>blogs</h2>
      <Notification message={notification} setNotification={setNotification}/>
      {JSON.parse(window.localStorage.loggedUsername)} logged in
      <button onClick={handleLogout}>logout</button>
  </div>
)

export default bloglist
