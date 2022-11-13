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
      if (err.response.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized',
          'error'
        );
      }
    })

  const token = res?.data?.accessToken

  const secondRes = await axios.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me',
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  )
    .catch(err => {
      if (err.response.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized',
          'error'
        );
      }
    })

  if (secondRes) {
    const { data } = secondRes
    const { id, createdAt } = data

    store.dispatch(LoginUser({ user: data, token }))
    CreateAccount({ createdAt, id, token })

    Swal.fire({
      icon: 'success',
      text: 'Login successful',
    });

    const { lsUser } = JSON.parse(localStorage?.getItem('expenses')) ?? []
    if (lsUser?.id !== id) {
      localStorage.removeItem('expenses')
    }

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
      if (err.response.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized',
          'error'
        );
      }
      if (err.response.status === 403) {
        Swal.fire(
          'Oops!',
          'Forbidden access',
          'error'
        );
      }
      if (err.response.status === 500) {
        Swal.fire(
          'Oops!',
          'Internal server error. Try again later!',
          'error'
        );
      }
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
  localStorage.removeItem('alkybank_state')
  Swal.fire({
    icon: 'success',
    text: 'Logout successful',
  })
  return true
}
