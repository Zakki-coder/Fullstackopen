import { useState } from 'react'
import Likes from './Likes'
import PropTypes from 'prop-types'
import { removeBlog, putBlog } from '../services/blogs'
import { useMutation, useQueryClient } from 'react-query'

const Blog = ({ blog, index }) => {
  const [show, setShow] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  const viewInfo = { display: show ? '' : 'none' }
  const viewRemove = {
    display:
      window.localStorage.loggedUsername === JSON.stringify(blog.user.username)
        ? ''
        : 'none',
  }
  const queryClient = useQueryClient()

  const removeBlogMutation = useMutation(removeBlog, {
    onSuccess: () => {
      const blogs = queryClient.getQueryData('blogs')
      const newBlogs = blogs.toSpliced(index, 1)
      queryClient.setQueryData('blogs', newBlogs)
    },
  })

  const toggleShow = () => {
    const showInvert = !show
    setShow(showInvert)
    showInvert ? setLabel('hide') : setLabel('view')
  }

  const blogRemove = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    )
    if (confirm) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  const addLikeMutation = useMutation(putBlog, {
    onSuccess: () => {
      const newBlogs = queryClient.getQueryData('blogs')
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      newBlogs[index] = updatedBlog
      queryClient.setQueryData('blogs', newBlogs)
    },
  })

  const addLike = async (event) => {
    event.stopPropagation()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    addLikeMutation.mutate(updatedBlog)
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
          <button id="remove-button" style={viewRemove} onClick={blogRemove}>
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
}

export default Blog
