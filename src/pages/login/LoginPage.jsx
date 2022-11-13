// Components
import Login from '../../components/login/Login'
import Welcome from '../../components/welcome/Welcome'
import styled from './LoginPage.module.css'


const LoginPage = () => {
  return (
    <div className={ styled.loginPageContainer }>
      <div className={ styled.loginPageWrapper }>
        <div className={ styled.welcome }>
          <Welcome />
        </div>
        <div className={ styled.contenedor }>
          <Login />
        </div>
      </div>
    </div>
  )
}
export default LoginPage
