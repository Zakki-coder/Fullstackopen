import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [userCredentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
      if (user)
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        )  
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
      console.log('Login failed', exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    setUser(null)
  }

  if (user)
    return  (
      <div>
        <Bloglist blogs={blogs} handleLogout={handleLogout}/>
        <Newblog />
      </div>
    )
  return (
     <Login userCredentials={userCredentials} handleLogin={handleLogin} setCredentials={setCredentials}/>
  )
}

export default App
