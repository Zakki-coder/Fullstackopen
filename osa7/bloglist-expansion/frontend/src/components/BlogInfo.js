import { useSelector } from 'react-redux'
import Likes from './Likes'
import { useParams } from 'react-router-dom'

const BlogInfo = () => {
  const blogId = useParams().blog 
  const blog = useSelector(state => state.blogs).find(blog => blog.id === blogId)
  if (!blog)
    return null
  return (
        <div>
          <h2>{blog.title}</h2>
          <a href={`//${blog.url}`}>{blog.url}</a>
          <br></br>
          <Likes blog={blog} />
          {blog.user.username}
          <br></br>
        </div>
  )
}

export default BlogInfo
