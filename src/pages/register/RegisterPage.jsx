// Components
import Register from '../../components/register/Register'
import Welcome from '../../components/welcome/Welcome'
import './registerpage.css'
const RegisterPage = () => {
  return (
    <div className='register-page-container'>
      <div className='register-page-wrapper'>
        <div className='welcome'>
          <Welcome />
        </div>
        <div>
          <Register />
        </div>
      </div>
    </div>
  )
}
export default RegisterPage
