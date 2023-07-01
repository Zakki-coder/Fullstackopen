import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlog = ({ blogFormRef, blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const response = await blogService.post(newBlog)
      setBlogs([...blogs, response])
      setNotification(`a new blog ${title} by ${author} added`)
      blogFormRef.current.toggleVisible()
    } catch(exception) {
      console.error('Posting of a new blog failed', exception)
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target } ) => setAuthor(target.value) }
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value) }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  blogFormRef: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default NewBlog
