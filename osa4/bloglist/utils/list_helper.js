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

module.exports = {
  dummy,
  totalLikes,
}