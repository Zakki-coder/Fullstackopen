import { useState, useEffect, useRef, useContext } from 'react'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import User from './components/User'
import UserContext, { setUser } from './contexts/userContext'

const App = () => {
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [user, userDispatch] = useContext(UserContext)
  const [errorMessage, setError] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    try {
      const tokenStr = window.localStorage.getItem('loggedBlogappUser')
      const loggedUser = JSON.parse(tokenStr)
      userDispatch(setUser(loggedUser))
    } catch (exception) {
      console.log(exception)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    userDispatch(setUser(null))
  }

  if (user)
    return (
      <div>
        <User handleLogout={handleLogout} />
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <Newblog blogFormRef={blogFormRef} />
        </Togglable>
        <Bloglist />
      </div>
    )
  return (
    <Login
      userCredentials={userCredentials}
      setCredentials={setCredentials}
      setError={setError}
      errorMessage={errorMessage}
    />
  )
}

export default App
