import LogoLoginIcon from '../../assets/icons/LogoLoginIcon'
import './welcome.css'
const Welcome = () => {
  return (
    //flex column en login y welcome
    <div className='welcome-container'>
      <div>
        <div className='logo'><LogoLoginIcon /></div>
        <h1 className='welcome-title'>Welcome to</h1>
        <h1 className='welcome-title-alkybank'>AlkyBank</h1>
      </div>
      <div className='welcome-span'>
        <span>Fast. Secure. Trustworthy.</span>
      </div>
    </div>
  )
}

export default Welcome