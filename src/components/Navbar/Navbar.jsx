import AddMoneyIcon from '../../assets/icons/AddMoneyIcon'
import DashboardIcon from '../../assets/icons/DashboardIcon'
import Logo from '../../assets/icons/Logo'
import NewExpense from '../../assets/icons/NewExpense'
import NightModeIcon from '../../assets/icons/NightModeIcon'
import SendMoney from '../../assets/icons/SendMoney'
import TransactionsIcon from '../../assets/icons/TransactionsIcon'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="logoContainer">
        <Logo />
        <span className="logoTitle">AlkyBank</span>
      </div>
      <div className="container">
        <div className="manageContainer">
          <span>Manage</span>
          <div className="sectionsContainer">
            <div className="sections">
              <DashboardIcon className="hoverIcon" />
              <p>Dashboard</p>
            </div>
            <div className="sections">
              <TransactionsIcon className="hoverIcon" />
              <p>Transactions</p>
            </div>
            <div className="sections">
              <AddMoneyIcon className="hoverIcon" />
              <p>Add money</p>
            </div>
            <div className="sections">
              <SendMoney className="hoverIcon" />
              <p>Send money</p>
            </div>
            <div className="sections">
              <NewExpense className="hoverIcon" />
              <p>New expense</p>
            </div>
          </div>
        </div>
        <div>
          <div className="preferenceContainer">
            <span>Preferences</span>
            <div className="sectionsContainer">
              <div className="sections">
                <NightModeIcon className="hoverIcon" />
                <p>Dark Mode</p>
              </div>
            </div>
          </div>
          <div className="userContainer">
            <span className="userNameContainer">Juan Perez</span>
            <span className="userEmailContainer">juanperez@example.com</span>
            <span className='logOut'>Log out</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
