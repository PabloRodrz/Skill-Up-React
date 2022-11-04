// Components
import Login from '../../components/login/Login'
import Welcome from '../../components/welcome/Welcome'
import './loginpage.css'

const LoginPage = () => {
  return (
    <div className='login-page-container'>
      <div className='login-page-wrapper'>
        <div className='welcome'>
          <Welcome />
        </div>
        <div>
          <Login />
        </div>
      </div>
    </div>
  )
}
export default LoginPage
