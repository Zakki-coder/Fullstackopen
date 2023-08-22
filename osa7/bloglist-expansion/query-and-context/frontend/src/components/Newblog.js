import { useState } from 'react'
import { useContext } from 'react'
import NotificationContext, { createNotification } from '../contexts/notificationContext'
import { useMutation, useQueryClient } from 'react-query'
import { addBlog } from '../services/blogs'

const NewBlog = ({ blogFormRef }) => {
  const notificationDispatch = useContext(NotificationContext)[1]
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient('blogs')

  const addBlogMutation = useMutation(addBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))
    }
  })

  const blogAdd = (title, author, url) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    addBlogMutation.mutate(newBlog)
    blogFormRef.current.toggleVisible()
  }

  const addBlogEvent = async (event) => {
    event.preventDefault()
    blogAdd(title, author, url)
    notificationDispatch(createNotification(`${title} by ${author} added`))
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
              onChange={({ target }) => setTitle(target.value) }
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
              onChange={({ target } ) => setAuthor(target.value) }
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
              onChange={({ target }) => setUrl(target.value) }
            />
          </label>
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog
