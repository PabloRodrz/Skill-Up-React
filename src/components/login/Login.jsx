// Libraries
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../Button/index'
import styled from './Login.module.css'
// Redux
import { logedUser, login, reset } from '../../slices/authSlice'

function Login() {
  const token = JSON.parse(localStorage.getItem('token'))

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
      dispatch(logedUser())

      setTimeout(() => navigate('/'), 300);
    }

    dispatch(reset())
  }, [token?.accessToken/* isSuccess, isError, message, navigate, dispatch, isSuccess */])

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
    }

    dispatch(login({ email, password, }))
  }

  return (
    <>
      <h2 className={styled.loginTitle}>Login</h2>
      <section>
        <form className={styled.form} onSubmit={onSubmit}>
          <div className={styled.formInputs}>
            <div>
              <div className={styled.labels}>
                <label className={styled.label}>Email</label>
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
              <div className={styled.labels}>
                <label className={styled.label}>Password</label>
              </div>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
                autoComplete='true'
              />
            </div>
          </div>

          <div className={styled.loginBtn}>
            <Button text={'LOGIN'} options={{ uppercase: true }} />
          </div>
          <div className={styled.loginFooter}>
            <span>
              New user?{' '}
              <Link className={styled.signupLink} to={'/signup'}>
                {' '}
                <b>Sign up</b>
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
