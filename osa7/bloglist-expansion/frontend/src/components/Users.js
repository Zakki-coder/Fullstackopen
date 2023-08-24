import { useSelector } from 'react-redux'
import { Link, Outlet, useParams } from 'react-router-dom'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useParams().user
  
  if (!blogs || blogs.length <= 0)
    return null

  const users = blogs
            .map(blog => blog.user.username)
            .filter((user, index, arr) => arr.indexOf(user) === index)
            .map(user => {
              return {
                user,
                blogCount: function() {return blogs.reduce((acc, blog) => {
                 if (blog.user.username === user)
                   return acc + 1
                 return acc
                 }, 0)
                }()
              }
            })

  const style = {
    textAlign: 'left'
  }

  if (user && users.some(username => username.user === user))
    return <Outlet />

  return (
    <>
      <h2>Users</h2>
        <table style={style}>
          <tbody>
          <tr>
            <th scope='col'></th>
            <th scope='col'>blogs created</th>
          </tr>
            {users.map((user, idx) =><tr key={idx}>
              <td scope='row'><Link to={user.user}>{user.user}</Link></td><td>{user.blogCount}</td>
          </tr>)}
          </tbody>
    </table>
    </>
  )
}

export default Users
