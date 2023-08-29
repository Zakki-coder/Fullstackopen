import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Likes from './Likes'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogsReducer'

const Comment = ({ blog }) => {
  const [ comment, setComment ] = useState('')
  const dispatch = useDispatch()

  const commentHandler = async(event) => {
    event.preventDefault()
    if (!comment)
      return null
    const newComment = {
      blogId: blog.id,
      comment
    }
    setComment('')
    dispatch(addComment(newComment))
  }

  return (
    <>
      <form onSubmit = { commentHandler } >
        <label>
            <input type='text' id='comment' name='comment' value={comment}
              onChange={(event) => setComment(event.target.value)}/>
        </label>
        <button type='submit'>add comment</button>
      </form>
    </>
  )
}

const BlogInfo = () => {
  const blogId = useParams().blog 
  const blog = useSelector(state => state.blogs).find(blog => blog.id === blogId)
  if (!blog)
    return null
  return (
        <div>
          <h2>{blog.title}</h2>
          <Comment blog={blog}/>
          <a href={`//${blog.url}`}>{blog.url}</a>
          <br></br>
          <Likes blog={blog} />
          {blog.user.username}
          <br></br>
          <ul>
            {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
          </ul>
        </div>
  )
}

export default BlogInfo
