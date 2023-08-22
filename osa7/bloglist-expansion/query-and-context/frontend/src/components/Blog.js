import { useState } from 'react'
import Likes from './Likes'
import PropTypes from 'prop-types'
import { removeBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  const viewInfo = { display: show ? '' : 'none' }
  const viewRemove = {
    display:
      window.localStorage.loggedUsername === JSON.stringify(blog.user.username)
        ? ''
        : 'none',
  }
  const dispatch = useDispatch()

  const toggleShow = () => {
    const showInvert = !show
    setShow(showInvert)
    showInvert ? setLabel('hide') : setLabel('view')
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
          <Likes blog={blog} />
          {blog.user.username}
          <br></br>
          <button id="remove-button" style={viewRemove} onClick={() => dispatch(removeBlog(blog))}>
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