import Blog from './Blog'
import { useSelector } from 'react-redux'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs).slice() 

  const sortFunc = (a, b) => {
    if (a > b) return -1
    if (a < b) return 1
    return 0
  }

  return (
    <div className="bloglist" id="bloglist">
      {blogs
        .sort((a, b) => sortFunc(a.likes, b.likes))
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default Bloglist
