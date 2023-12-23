import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (user) => {
  const result = await axios.post(baseUrl, user)
  return result.data
}

export default { login }