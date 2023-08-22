import axios from 'axios'
const baseurl = '/api/login'

const userLogin = async (user) => {
  const response = await axios
    .post(baseurl, {
      username: user.username,
      password: user.password
    })
  return response.data.Authorization
}

export default { userLogin }
