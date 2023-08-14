import PropTypes from 'prop-types'

const Likes = ({ blog, addLike }) => {
  return (
    <div id="likes">
      {blog.likes}
      <button id="like-button" onClick={addLike}>
        like
      </button>
    </div>
  )
}

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
}

export default Likes
