import PropTypes from 'prop-types'

const Likes = ({ blog, addLike }) => {

  return (
    <div>
      {blog.likes}
      <button onClick={addLike}>like</button>
    </div>
  )
}

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Likes
