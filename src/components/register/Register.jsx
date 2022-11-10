// Libraries
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Button from '../../components/Button/index'
import styled from './Register.module.css'

// Redux
import { register, reset } from '../../slices/authSlice'

const Register = () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  })

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const { first_name, last_name, email, password } = formData

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (isSuccess) {
      Swal.fire('User registered successful')
      navigate('/login')
    }
    if (token?.accessToken) {
      navigate('/')
    }

    dispatch(reset())
  }, [token?.accessToken, isSuccess, isError, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      first_name,
      last_name,
      email,
      password,
      roleId: 1,
      points: 0,
    }
    if (
      email === '' ||
      password === '' ||
      first_name === '' ||
      last_name === ''
    ) {
      Swal.fire('Complete all fields')
      return
    }
    if (email !== '' && !regex.test(email)) {
      Swal.fire('Invalid mail')
      return
    }
    dispatch(register(userData))
  }
  return (
    <>
      <section>
        <h2>Sign up</h2>
      </section>
      <form className={ styled.form } onSubmit={onSubmit}>
        <div className={styled.formInputs}>
          <div>
            <div className={styled.labels}>
              <label className={ styled.label }>First name</label>
            </div>
            <input
              type='text'
              id='first_name'
              name='first_name'
              value={first_name}
              onChange={onChange}
            />
          </div>
          <div>
            <div className={styled.labels}>
              <label className={ styled.label }>Last name</label>
            </div>
            <input
              type='text'
              id='last_name'
              name='last_name'
              value={last_name}
              onChange={onChange}
            />
          </div>
          <div>
            <div className={styled.labels}>
              <label className={ styled.label }>Email</label>
            </div>
            <input
              type='string'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <div className={styled.labels}>
              <label className={ styled.label }>Password</label>
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
          <div>
            <Button text={'Sign up'} options={{ uppercase: true }} />
          </div>
        </div>
      </form>
    </>
  )
}
export default Register
