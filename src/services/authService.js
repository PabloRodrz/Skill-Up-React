import axios from 'axios'

// Login user
const login = async ({ email, password }) => {
  const res = await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/login',
    { email, password }
  )

  if (res.data) {
    localStorage.setItem('token', JSON.stringify(res.data))
  }

  return res.data
}

// Get loged user

const getLogedUser = async () => {
  // Token
  const token = JSON.parse(localStorage.getItem('token'))

  const config = {
    headers: {
      Authorization: 'Bearer ' + token.accessToken,
    },
  }
  const res = await axios.get(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me',
    config
  )

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

const authService = {
  logout,
  login,
  getLogedUser,
}

export default authService
