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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}