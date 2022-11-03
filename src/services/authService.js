import axios from 'axios'

// Register user
const register = async (userData) => {
  const res = await axios.post('users', userData)
  return res.data
}

const authService = {
  register,
}

export default authService
