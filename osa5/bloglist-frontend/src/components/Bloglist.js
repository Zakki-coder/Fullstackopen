import Blog from './Blog'
import PropTypes from 'prop-types'

const Bloglist = ({ blogs, setBlogs }) => {
  const sortFunc = (a, b) => {
    if (a > b)
      return -1
    if (a < b)
      return 1
    return 0
  }
  return (
    <div className='bloglist' id='bloglist'>
      {blogs.sort((a, b) => sortFunc(a.likes, b.likes)).map((blog, index) =>
        <Blog key={blog.id} blog={blog} index={index} allBlogs={blogs} setBlogs={setBlogs}/>
      )}
    </div>
  )}

Bloglist.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Bloglist
