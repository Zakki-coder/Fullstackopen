import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
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

  return (
    <>
      <h2>Users</h2>
        <table style={style}>
          <tr>
            <th scope='col'></th>
            <th scope='col'>blogs created</th>
          </tr>
          {users.map((user, idx) => <tr key={idx}><td scope='row'>{user.user}</td><td>{user.blogCount}</td></tr>)}
    </table>
    </>
  )
}

export default Users
