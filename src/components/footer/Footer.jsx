// Icons
import Logo from '../../assets/icons/FooterLogo'
import {
  FaInstagram,
  FaTwitterSquare,
  FaFacebookSquare,
  FaYoutube,
} from 'react-icons/fa'

// Styles
import styled from './footer.module.css'

const Footer = () => {
  return (
    <footer className={styled.container}>
      <footer className={styled.wrapper}>
        <section className={styled.logo}>
          <Logo />
          <h2 className={styled.brand}>AlkyBank</h2>
        </section>

        <section className={styled.socialMedia}>
          <h4>Follow us</h4>
          <div className={styled.icons}>
            <FaYoutube />
            <FaInstagram />
            <FaTwitterSquare />
            <FaFacebookSquare />
          </div>
        </section>

        <section className={styled.subscribe}>
          <div>
            <h4>To recieve more information subscribe.</h4>
            <div className={styled.footerForm}>
              <form>
                <input placeholder='Email' type='email' />
                <button>Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </footer>
      <div className={styled.copyright}>Development Team R7</div>
    </footer>
  )
}
export default Footer
