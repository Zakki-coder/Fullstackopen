import Blog from './Blog'

const bloglist = ({ handleLogout, blogs }) => (
   <div>
     <h2>blogs</h2>
      {JSON.parse(window.localStorage.loggedUsername)} logged in
      <button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </div>
)

export default bloglist
