// Libraries
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// Redux
import { login, reset } from '../../slices/authSlice'

function Login() {
  const token = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { email, password } = formData

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      Swal.fire(`test ${message}`)
      dispatch(reset())
      return
    }
    if (isSuccess) {
      Swal.fire('Login successful')
    }

    if (token?.accessToken) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, message, navigate, dispatch, token?.accessToken, isSuccess])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (email === '' || password === '') {
      Swal.fire('Invalid credentials')
      return
    }
    if (email !== '' && !regex.test(email)) {
      Swal.fire('Invalid mail or password')
      return
    } else {
      dispatch(
        login({
          email,
          password,
        })
      )
    }
  }

  return (
    <>
      <section>
        <h1>Login</h1>
        <p>Login and start setting goals</p>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
