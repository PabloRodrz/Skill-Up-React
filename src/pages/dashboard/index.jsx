import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CashIcon from '../../assets/icons/CashIcon';
import MoneyTransferredIcon from '../../assets/icons/MoneyTransferredIcon';
import NewExpenseIcon from '../../assets/icons/NewExpense';
import WalletIcon from '../../assets/icons/WalletIcon';
import Layout from '../../components/Layout/Layout';
import AuxComponent from '../Transactions/AuxComponent';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const USER = useSelector(state => state.auth.user)
  const { totalExpending, expenses, moneyTransferred } = useSelector(state => state.transactions)
  const transactions = useSelector(state => state.transactions)
  console.log(transactions)
  const MoneyFormatter = (value) =>
    new Intl
      .NumberFormat('en-US', { style: 'currency', currency: 'USD', /* signDisplay: 'always', currencySign: 'standard' */ })
      .format(value);


  return (
    <Layout page="Dashboard">
      <section className={styles.dashboard}>
        <div className={styles.cardsContainer}>
          <article className={styles.cards}>
            <WalletIcon />
            <span>${`${USER.points}`}</span>
          </article>
          <article className={styles.cards}>
            <CashIcon />
            <span>{MoneyFormatter(totalExpending)}</span>
          </article>
          <article className={styles.cards}>
            <NewExpenseIcon />
            <span>{MoneyFormatter(expenses)}</span>
          </article>
          <article className={styles.cards}>
            <MoneyTransferredIcon />
            <span>{MoneyFormatter(moneyTransferred)}</span>
          </article>
        </div>

        <AuxComponent viewAll={true} viewPagination={false} />
      </section>
    </Layout>
  );
};

export default Dashboard;
