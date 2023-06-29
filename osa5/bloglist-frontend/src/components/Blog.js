import { useState } from 'react'
import Likes from './Likes'

const Blog = ({ blog, index, allBlogs, setBlogs }) => {
  const [show, setShow] = useState(false)
  const [buttonLabel, setLabel] = useState('view')
  let viewInfo

  const toggleShow = () => {
    const showInvert = !show
    setShow(showInvert) 
    showInvert ? setLabel('hide') : setLabel('view')
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
    </div>
   </div>
  )
}

export default Blog
