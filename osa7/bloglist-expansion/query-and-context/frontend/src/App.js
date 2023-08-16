import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import NotificationContext from './reducers/notificationReducer'
import { useContext } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setError] = useState('')
  const blogFormRef = useRef()
  const notificationContext = useContext(NotificationContext)
  const notificationDispatch = notificationContext[1]
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

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    dispatch(setUser(null))
  }

  const addBlog = async (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const response = await blogService.post(newBlog)
      setBlogs([...blogs, response])
      console.log('LOL')
      notificationDispatch(setNotification(`${newBlog.title} by ${newBlog.author} added` ))
      blogFormRef.current.toggleVisible()
    } catch (exception) {
      console.error('Posting of a new blog failed', exception)
    }
  }

  if (user)
    return (
      <div>
        <User
          handleLogout={handleLogout}
        />
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <Newblog addBlog={addBlog} />
        </Togglable>
        <Bloglist blogs={blogs} setBlogs={setBlogs} />
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
