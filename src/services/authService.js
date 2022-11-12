import axios from 'axios'
import Swal from 'sweetalert2'
import store from '../redux/store'
import { LoginUser, Reset } from '../slices/authSlice'
import { cleanTransactions } from '../slices/transactionsSlice'
import { CreateAccount } from './accountsService'

export const LogIn = async ({ email, password }) => {
  const res = await axios.post('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/login',
    { email, password }
  )
    .catch(err => {
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.error,
      })
    })

  const token = res.data.accessToken

  const secondRes = await axios.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  )
    .catch(err => {
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.error,
      })
    })

  if (secondRes) {
    const { data } = secondRes

    store.dispatch(LoginUser({ user: data, token }))
    CreateAccount({ ...res.data, token })

    Swal.fire({
      icon: 'success',
      text: 'Login successful',
    });

    return true
  }

  return false
}


export const SignIn = async (userData) => {
  const res = await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users',
    userData
  )
    .catch(err => {
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.error,
      })
    })

  if (res?.data) {
    Swal.fire({
      icon: 'success',
      text: 'User registered successful',
    })
    return true
  }

  return false
}

export const LogOut = () => {
  store.dispatch(Reset())
  store.dispatch(cleanTransactions())
  Swal.fire({
    icon: 'success',
    text: 'Logout successful',
  })
  return true
}
