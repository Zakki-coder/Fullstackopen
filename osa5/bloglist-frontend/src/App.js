import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import User from './components/User'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [errorMessage, setError] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    try {
      const tokenStr = window.localStorage.getItem('loggedBlogappUser')
      const loggedUser = JSON.parse(tokenStr)
      setUser(loggedUser)
    } catch (exception) {
      console.log(exception)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.userLogin(userCredentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(response)
      )
      window.localStorage.setItem(
        'loggedUsername', JSON.stringify(userCredentials.username)
      )
      setUser(response)
      setCredentials({ username: '', password: '' })
    } catch (exception) {
      setError('wrong username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    setUser(null)
  }

  const addBlog = async(title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const response = await blogService.post(newBlog)
      setBlogs([...blogs, response])
      setNotification(`a new blog ${title} by ${author} added`)
      blogFormRef.current.toggleVisible()
    } catch(exception) {
      console.error('Posting of a new blog failed', exception)
    }
  }

  if (user)
    return (
      <div>
        <User handleLogout={handleLogout} notification={notification} setNotification={setNotification}/>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <Newblog addBlog={addBlog}/>
        </Togglable>
        <Bloglist blogs={blogs} setBlogs={setBlogs}/>
      </div>
    )
  return (
    <Login userCredentials={userCredentials} handleLogin={handleLogin} setCredentials={setCredentials} setError={setError} errorMessage={errorMessage} />
  )
}

export default App
