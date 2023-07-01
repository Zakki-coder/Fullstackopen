import { useState } from 'react'
import Likes from './Likes'
import Services from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, index, allBlogs, setBlogs }) => {
  const [show, setShow] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  let viewInfo

  const toggleShow = () => {
    const showInvert = !show
    setShow(showInvert)
    showInvert ? setLabel('hide') : setLabel('view')
  }

  const removeBlog = async() => {
    const confirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (confirm) {
      try {
        const response = await Services.remove(blog.id)
        if (response) {
          const newBlogs = allBlogs.toSpliced(index, 1)
          setBlogs(newBlogs)
        }
      } catch(exception) {
        console.error(exception)
      }
    }
  }

  viewInfo = { display: show ? '' : 'none' }
  return (
    <div className='blog' onClick={toggleShow}>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>{buttonLabel}</button>
      <div style={viewInfo}>
        <a href={`//${blog.url}`}>{blog.url}</a><br></br>
        <Likes blog={blog} index={index} allBlogs={allBlogs} setBlogs={setBlogs}/>
        {blog.user.username}<br></br>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  allBlogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog
