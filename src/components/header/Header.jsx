// Libraries
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// Redux
import { reset } from '../../slices/authSlice'

// Styles
import styled from './header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <header className={styled.container}>
      <nav>
        <ul>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/login'>login</Link>
          </li>
          <li>
            <Link to='/register'>register</Link>
          </li>
          <li>
            <Link to='/login'>logout</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
