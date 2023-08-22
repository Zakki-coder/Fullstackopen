import Blog from './Blog'
import { initializeBlogs } from '../reducers/blogsReducer'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs).slice() 
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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
