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

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((favBlog, curBlog) => {
    if (!favBlog.likes || favBlog.likes < curBlog.likes)
      return favBlog = curBlog
    return favBlog
  },{})
  return blog
}

//TODO test with empty array and with array including an empty object
const mostBlogs = (blogs) => {
  const mostBlogs =
    lodash
      .countBy(blogs, (blog) => blog.author)

  const res = Object.keys(mostBlogs).reduce((mostSoFar, curr) => {
    if (!mostSoFar || mostBlogs[mostSoFar] < mostBlogs[curr])
      return curr
    return mostSoFar
  })
  return { [res]: mostBlogs[res] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}