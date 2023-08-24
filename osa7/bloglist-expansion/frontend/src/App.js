import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import Bloglist from './components/Bloglist'
import Newblog from './components/Newblog'
import Togglable from './components/Togglable'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router,
        Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import UsersBlogs from './components/UsersBlogs'

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
      dispatch(initializeBlogs()) //With this blogs exist even when refreshing routers
    } catch (exception) {
      console.log(exception)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedUsername')
    dispatch(setUser(null))
  }

  const padding = {
    padding: 5
  }

  const Blogs = () => {
    return (
      <div>
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
           <Newblog />
        </Togglable>
        <Bloglist />
      </div>
    )
  }

  if (user)
    return (
    <Router>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <div>
        <User handleLogout={handleLogout} />
      </div>
        <Routes>
          <Route path='/' element={<Blogs/>}/>
          <Route path='users' element={<Users/>}>
            <Route path=':user' element={<UsersBlogs/>}/>
          </Route>
          <Route path='*' element={<Blogs/>}/>
        </Routes>
    </Router>
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
