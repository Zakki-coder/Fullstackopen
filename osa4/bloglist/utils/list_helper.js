const lodash = require('lodash/collection')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const sum = (accumulator, current) => {
    if (current.likes)
      return accumulator += current.likes
    return accumulator
  }
  if (blogs)
    return blogs.reduce(sum, 0)
  return 0
}

const objectValidator = (obj) => {
  return (
    obj &&
    Object.keys(obj).length > 0 &&
    obj.constructor === Object
  )
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((favBlog, curBlog) => {
    if (!objectValidator(favBlog) || favBlog.likes < curBlog.likes)
      return curBlog
    return favBlog
  },{})
  return blog
}

const mostBlogs = (blogs) => {
  const mostBlogs =
    lodash
      .countBy(blogs, (blog) => blog.author)

  const res =
    Object
      .keys(mostBlogs)
      .reduce((mostSoFar, curr) => {
        if (mostBlogs[mostSoFar] < mostBlogs[curr])
          return curr
        return mostSoFar
      })
  return { [res]: mostBlogs[res] }
}

const mostLikes = (blogs) => {
  const groupedByAuthor =
    lodash
      .groupBy(blogs, (blog) => blog.author)

  const mostLikedAuthor =
    Object
      .keys(groupedByAuthor)
      .map((key) => {
        const likes = groupedByAuthor[key].reduce((accumulator, current) => accumulator += current.likes, 0)
        return { 'author': key, 'likes': likes }
      })
      .reduce((mostLikes, curAuthor) => {
        if (!objectValidator(mostLikes) && curAuthor.likes)
          return curAuthor
        return curAuthor.likes > mostLikes.likes ? curAuthor : mostLikes
      }, {})

  return (mostLikedAuthor)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}