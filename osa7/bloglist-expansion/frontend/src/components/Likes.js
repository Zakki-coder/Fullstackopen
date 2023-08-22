import PropTypes from 'prop-types'
import { addLike } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const Likes = ({ blog }) => {
  const dispatch = useDispatch()
  return (
    <div id="likes">
      {blog.likes}
      <button id="like-button" onClick={() => dispatch(addLike(blog))}>
        like
      </button>
    </div>
  )
}

Likes.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Likes
