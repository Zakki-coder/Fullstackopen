import axios from 'axios'
const baseUrl = '/api/blogs'

const authorize = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(
        window.localStorage.getItem('loggedBlogappUser'),
      )}`,
    },
  }
  return config
}

const getAll = () => {
  const config = authorize()
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const post = ({ title, author, url }) => {
  const config = authorize()
  const data = {
    title: title,
    author: author,
    url: url,
  }
  const request = axios.post(baseUrl, data, config)
  return request.then((response) => response.data)
}

const put = async (blog) => {
  const config = authorize()
  const url = `${baseUrl}/${blog.id}`
  try {
    const response = await axios.put(url, blog, config)
    return response
  } catch (exception) {
    console.error(exception)
  }
}

const remove = async (id) => {
  const config = authorize()
  const url = `${baseUrl}/${id}`
  try {
    const response = await axios.delete(url, config)
    return response
  } catch (exception) {
    console.error(exception)
  }
}

export default { getAll, post, put, remove }
