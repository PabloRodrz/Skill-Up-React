import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AddMoneyIcon from '../../assets/icons/AddMoneyIcon';
import DashboardIcon from '../../assets/icons/DashboardIcon';
import Logo from '../../assets/icons/Logo';
import LogOutIcon from '../../assets/icons/LogOutIcon';
import NewExpense from '../../assets/icons/NewExpense';
import NightModeIcon from '../../assets/icons/NightModeIcon';
import SendMoney from '../../assets/icons/SendMoney';
import TransactionsIcon from '../../assets/icons/TransactionsIcon';
import { LogOut } from '../../services/authService';
import styled from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const USER = useSelector((state) => state.auth.user);
  return (
    <div className={styled.Navbar}>
      <div className={styled.logoContainer}>
        <Logo />
        <span className={styled.logoTitle}>AlkyBank</span>
      </div>
      <div className={styled.container}>
        <div className={styled.manageContainer}>
          <span>Manage</span>
          <div className={styled.sectionsContainer}>
            <Link className={styled.sections} to="/">
              <DashboardIcon className={styled.hoverIcon} />
              <p>Dashboard</p>
            </Link>
            <Link className={styled.sections} to="/transactions">
              <TransactionsIcon className={styled.hoverIcon} />
              <p>Transactions</p>
            </Link>
            <Link className={styled.sections} to="/addmoney">
              <AddMoneyIcon className={styled.hoverIcon} />
              <p>Add money</p>
            </Link>
            <Link className={styled.sections} to="/sendmoney">
              <SendMoney className={styled.hoverIcon} />
              <p>Send money</p>
            </Link>
            <Link className={styled.sections} to="/newexpense">
              <NewExpense className={styled.hoverIcon} />
              <p>New expense</p>
            </Link>
          </div>
        </div>
        <div>
          <div className={styled.preferenceContainer}>
            <span>Preferences</span>
            <div className={styled.sectionsContainer}>
              <div className={styled.sections}>
                <NightModeIcon className={styled.hoverIcon} />
                <p>Dark Mode</p>
              </div>
            </div>
          </div>
          <div className={styled.userContainer}>
            <div className={styled.userDetail}>
              <span
                className={styled.userNameContainer}
              >{`${USER.first_name} ${USER.last_name}`}</span>
              <span className={styled.userEmailContainer}>{USER.email}</span>
            </div>
            <button
              className={styled.logOut}
              onClick={() => {
                if (LogOut()) {
                  navigate('/');
                }
              }}
            >
              <LogOutIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
