import { useState } from 'react'
import Likes from './Likes'
import Services from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, index, allBlogs, setBlogs }) => {
  const [show, setShow] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  const viewInfo = { display: show ? '' : 'none' }
  const viewRemove = {
    display:
      window.localStorage.loggedUsername === JSON.stringify(blog.user.username)
        ? ''
        : 'none',
  }

  const toggleShow = () => {
    const showInvert = !show
    setShow(showInvert)
    showInvert ? setLabel('hide') : setLabel('view')
  }

  const removeBlog = async () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    )
    if (confirm) {
      try {
        const response = await Services.remove(blog.id)
        if (response) {
          const newBlogs = allBlogs.toSpliced(index, 1)
          setBlogs(newBlogs)
        }
      } catch (exception) {
        console.error(exception)
      }
    }
  }

  const addLike = async (event) => {
    event.stopPropagation()
    const newBlogs = [...allBlogs]
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    newBlogs[index] = updatedBlog
    setBlogs(newBlogs)
    try {
      await Services.put(updatedBlog)
    } catch (exception) {
      console.error(exception)
    }
  }

  return (
    <div className="blog" onClick={toggleShow}>
      {blog.title} {blog.author}
      <button id="view-button" onClick={toggleShow}>
        {buttonLabel}
      </button>
      {show && (
        <div id="blog-info" style={viewInfo} className="togglableContent">
          <a href={`//${blog.url}`}>{blog.url}</a>
          <br></br>
          <Likes blog={blog} addLike={addLike} />
          {blog.user.username}
          <br></br>
          <button id="remove-button" style={viewRemove} onClick={removeBlog}>
            remove
          </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  allBlogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
