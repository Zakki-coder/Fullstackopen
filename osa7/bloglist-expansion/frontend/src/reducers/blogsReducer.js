import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    newBlog(state, action) {
      return state.concat(action.payload)
    }
  }

})

const { setBlogs, newBlog } = blogsSlice.actions

export const removeBlog = ({ id, title, author }) => {
  return (dispatch, getState) => {
    const confirm = window.confirm(`Remove blog ${title} by ${author}`)
    if (confirm) {
      blogsService.remove(id)
      const blogs = getState().blogs.filter(blog => {
        if (blog.id !== id)
          return blog
      })
      dispatch(setBlogs(blogs))
    }
  }
  
}

export const addLike = (blog) => {
  return (dispatch, getState) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    blogsService.put(newBlog)
    const newState = getState().blogs.map(oldBlog => {
      if (oldBlog.id === newBlog.id)
        return newBlog
      return oldBlog
    })
    dispatch(setBlogs(newState))
  }
}

export const addComment = (newComment) => {
  return (async(dispatch, getState) => {
    try {
      const res = await blogsService.postComment(newComment)
      const comment = res.data
      const newState = getState().blogs.map(oldBlog => {
        if (oldBlog.id === comment.blog.id) {
          const newBlog = {...oldBlog, comments: oldBlog.comments.concat({ comment: comment.comment, id: comment.id })}
            return newBlog
          }
          return oldBlog
      })
      dispatch(setBlogs(newState))
    } catch(exception) {
      console.log(exception)
    }
    })
}

export const addBlog = (blog) => {
  return async(dispatch) => {
    const response = await blogsService.post(blog)
    dispatch(newBlog(response))
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll() 
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer
