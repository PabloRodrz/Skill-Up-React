import axios from 'axios'

// Register user
const register = async (userData) => {
  const res = await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users',
    userData
  )
  return res.data
}

// Login user
const login = async ({ email, password }) => {
  const res = await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/login',
    { email, password }
  )

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }

  return res.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
