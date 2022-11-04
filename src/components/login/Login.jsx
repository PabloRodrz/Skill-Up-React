// Libraries
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './login.css'
import Button from '../Button/index'
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
      <h2 className='login-title'>Login</h2>
      <section>
        <form onSubmit={onSubmit}>
          <div className='form-inputs'>
            <div>
              <div className='labels'>
                <label>
                  Email
                </label>
              </div>

              <input
                type='text'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
              />
            </div>
            <div>
              <div className='labels'>
                <label>
                  Password
                </label>
              </div>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </div>
          </div>

          <div className='login-btn'>
            <Button text={"LOGIN"} options={{ uppercase: true }} />
          </div>
          <div className='login-footer'>
            <span>New user? <Link className='signup-link' to={"/signup"}> <b>Sign up</b></Link></span>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
