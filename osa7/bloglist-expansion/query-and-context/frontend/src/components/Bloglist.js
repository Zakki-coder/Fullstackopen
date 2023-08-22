import Blog from './Blog'
import { useQuery } from 'react-query'
import { getAll } from '../services/blogs'

const Bloglist = ({ setBlogs }) => {
  const blogQuery = useQuery('blogs', getAll)
  let blogs = ''

  if (blogQuery.status === 'success')
    blogs = blogQuery.data

  const sortFunc = (a, b) => {
    if (a > b)
      return -1
    if (a < b)
      return 1
    return 0
  }

  if (blogs) {
    return (
      <div className='bloglist' id='bloglist'>
        {blogs.sort((a, b) => sortFunc(a.likes, b.likes)).map((blog, index) =>
          <Blog key={blog.id} blog={blog} index={index} allBlogs={blogs} setBlogs={setBlogs}/>
        )}
      </div>
    )
  }
  return null
}

export default Bloglist
