import { useState, useEffect, useRef } from 'react'
import Login from './components/Login'
import User, { LoggedInUser } from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router,
        Routes, Route, Link
} from 'react-router-dom'
import Users from './components/Users'
import UsersBlogs from './components/UsersBlogs'
import BlogInfo from './components/BlogInfo'
import Blogs from './components/Blogs'

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

  const navStyle = {
    backgroundColor: 'lightGrey',
    borderRadius: '5px',
    padding: '5px'
  }

  if (user)
    return (
    <Router>
      <div style={navStyle}>
        <Link style={padding} to='/'>blogs</Link>
        <Link style={padding} to='/users'>users</Link>
        <LoggedInUser/>
      </div>
        <User handleLogout={handleLogout} />
      <div>
      </div>
        <Routes>
          <Route path='/' element={<Blogs blogFormRef={blogFormRef}/>}>
            <Route path='blogs/:blog' element={<BlogInfo/>}/>
          </Route>
          <Route path='users' element={<Users/>}>
            <Route path=':user' element={<UsersBlogs/>}/>
          </Route>
          <Route path='*' element={<Blogs blogFormRef={blogFormRef}/>}/>
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
