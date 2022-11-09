// Components
import Register from '../../components/register/Register'
import Welcome from '../../components/welcome/Welcome'
import styled from './RegisterPage.module.css'


const RegisterPage = () => {
  return (
    <div className={ styled.registerPageContainer }>
      <div className={ styled.registerPageWrapper }>
        <div className={ styled.welcome }>
          <Welcome />
        </div>
        <div className={ styled.contenedor }>
          <Register />
        </div>
      </div>
    </div>
  )
}
export default RegisterPage
