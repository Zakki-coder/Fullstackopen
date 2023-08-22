import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setError] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    try {
      const tokenStr = window.localStorage.getItem('loggedBlogappUser')
      const loggedUser = JSON.parse(tokenStr)
      dispatch(setUser(loggedUser))
    } catch (exception) {
      console.log(exception)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    dispatch(setUser(null))
  }

  if (user)
    return (
      <div>
        <User
          handleLogout={handleLogout}
        />
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <Newblog />
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
