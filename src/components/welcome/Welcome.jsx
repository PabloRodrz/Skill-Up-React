import LogoLoginIcon from '../../assets/icons/LogoLoginIcon'
import styled from './Welcome.module.css'
const Welcome = () => {
  return (
    <div className={ styled.welcomeContainer }>
      <div className={ styled.container }> 
        <div className={ styled.logo }><LogoLoginIcon /></div>
        <h1 className={ styled.welcomeTitle }>Welcome to</h1>
        <h1 className={ styled.welcomeTitleAlkybank }>AlkyBank</h1>
      </div>
      <div className={ styled.welcomeSpan }>
        <span>Fast. Secure. Trustworthy.</span>
      </div>
    </div>
  )
}

export default Welcome