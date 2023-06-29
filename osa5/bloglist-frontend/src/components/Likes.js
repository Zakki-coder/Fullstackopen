import services from '../services/blogs'

const Likes = ({ blog, index, allBlogs, setBlogs }) => {

  const addLike = async (event) => {
    event.stopPropagation()
    const newBlogs = [...allBlogs]
    const updatedBlog = {...blog, likes: blog.likes + 1}
    newBlogs[index] = updatedBlog
    setBlogs(newBlogs)
    try {
      await services.put(updatedBlog)
    } catch(exception) {
      console.error(exception)
    }
  }

  return (
    <div>
      {blog.likes}
      <button onClick={addLike}>like</button>
    </div>
  )
}  

export default Likes
