import { useState } from 'react'

const addBlog = (event) => {
  event.preventDefault()
  console.log(event)
}

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
        onChange={({target}) => setTitle(target.value)} 
      />
  </div>
  <div>
      <label>author:</label>
      <input
        type="text"
        value={author}
        name="author"
        onChange={({target}) => setAuthor(target.value)}
      />
  </div>
  <div>
    <label>url:</label>
    <input
      type="text"
      value={url}
      name="url"
      onChange={({target}) => setUrl(target.value)}
    />
  </div>
  <button type="submit">create</button>
  </form>
  </div>
  )
}

export default NewBlog
