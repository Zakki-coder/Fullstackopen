import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { useContext } from 'react'
import NotificationContext, { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const notificationDispatch = useContext(NotificationContext)[1]
 
  const addBlogEvent = async (event) => {
    event.preventDefault()
    dispatch(addBlog({ title, author, url }))
    setTimeout(() => {
      notificationDispatch(setNotification(''))
    }, 5000)
    notificationDispatch(setNotification(`${title} by ${author} added` ))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlogEvent}>
        <div>
          <label>
            title:
            <input
              id="title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              id="author"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              id="url"
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default NewBlog
