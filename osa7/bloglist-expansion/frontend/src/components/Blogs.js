import { Outlet, useParams } from 'react-router-dom'
import Bloglist from './Bloglist'
import Newblog from './Newblog'
import Togglable from './Togglable'

const Blogs = ({ blogFormRef }) => {
  const blogId = useParams().blog

  if (blogId)
    return <Outlet />
  
  const style = {
    display: 'grid',
    justifyContent: 'left',
  }

  return (
    <div style={style}>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
         <Newblog />
      </Togglable>
      <Bloglist />
    </div>
  )
}

export default Blogs
