import axios from 'axios'
const baseUrl = '/api/blogs'

const authorize = () => {
  const config = 
    {
      headers: { Authorization: `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser'))}` }
    }
  return config
}

const getAll = () => {
  const config = authorize()
  const request =
    axios
    .get(baseUrl, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
