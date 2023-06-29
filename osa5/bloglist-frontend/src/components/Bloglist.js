import Blog from './Blog'

const bloglist = ({ blogs, setBlogs }) => {
  const sortFunc = (a, b) => {
    if (a > b)
      return -1
    if (a < b)
      return 1
    return 0
  }
  return (
  <div>
      {blogs.sort((a, b) => sortFunc(a.likes, b.likes)).map((blog, index) =>
        <Blog key={blog.id} blog={blog} index={index} allBlogs={blogs} setBlogs={setBlogs}/>
      )}
  </div>
)}

export default bloglist
