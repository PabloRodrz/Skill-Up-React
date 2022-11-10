import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddMoneyIcon from "../../assets/icons/AddMoneyIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import Logo from "../../assets/icons/Logo";
import LogOutIcon from "../../assets/icons/LogOutIcon";
import NewExpense from "../../assets/icons/NewExpense";
import NightModeIcon from "../../assets/icons/NightModeIcon";
import SendMoney from "../../assets/icons/SendMoney";
import TransactionsIcon from "../../assets/icons/TransactionsIcon";
import { logout } from "../../slices/authSlice";
import styled from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const USER = useSelector(state => state.auth.user)

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
            <div className={styled.sections}>
              <DashboardIcon className={styled.hoverIcon} />
              <p>Dashboard</p>
            </div>
            <div className={styled.sections}>
              <TransactionsIcon className={styled.hoverIcon} />
              <p>Transactions</p>
            </div>
            <div className={styled.sections}>
              <AddMoneyIcon className={styled.hoverIcon} />
              <p>Add money</p>
            </div>
            <div className={styled.sections}>
              <SendMoney className={styled.hoverIcon} />
              <p>Send money</p>
            </div>
            <div className={styled.sections}>
              <NewExpense className={styled.hoverIcon} />
              <p>New expense</p>
            </div>
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
            <div>
              <span className={styled.userNameContainer}>{`${USER.first_name} ${USER.last_name}`}</span>
              <span className={styled.userEmailContainer}>{USER.email}</span>
            </div>
            <button
              className={styled.logOut}
              onClick={() => {
                dispatch(logout()),
                  navigate('/'),
                  Swal.fire('', 'Logout successful', 'success')
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
