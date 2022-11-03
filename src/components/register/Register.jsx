// Libraries
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

// Redux
import { register, reset } from '../../slices/authSlice'

const Register = () => {
  const token = JSON.parse(localStorage.getItem('user'))

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
      navigate('/login')
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
      roleId: 2,
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
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type='text'
              id='first_name'
              name='first_name'
              value={first_name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='text'
              id='last_name'
              name='last_name'
              value={last_name}
              placeholder='Enter your last name'
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type='string'
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
export default Register
