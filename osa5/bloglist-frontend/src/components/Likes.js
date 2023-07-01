import Services from '../services/blogs'
import PropTypes from 'prop-types'

const Likes = ({ blog, index, allBlogs, setBlogs }) => {

  const addLike = async (event) => {
    event.stopPropagation()
    const newBlogs = [...allBlogs]
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    newBlogs[index] = updatedBlog
    setBlogs(newBlogs)
    try {
      await Services.put(updatedBlog)
    } catch(exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      {blog.likes}
      <button onClick={addLike}>like</button>
    </div>
  )
}

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  allBlogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Likes
