import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UsersBlogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useParams().user

  return (
      <>
        <ul className='usersBlogs'>
          {
            blogs
              .map(blog => blog.user.username === user ? <li key={blog.id}>{blog.title}</li> : null )
          }
        </ul>
      </>
  )
}

export default UsersBlogs
