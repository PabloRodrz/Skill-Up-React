import { Link } from 'react-router-dom';
import CashIcon from '../../assets/icons/CashIcon';
import ExpensesIcon from '../../assets/icons/ExpensesIcon';
import MoneyTransferredIcon from '../../assets/icons/MoneyTransferredIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import Layout from '../../components/Layout/Layout';
import styles from './dashboard.module.css';
import SendMoneyIcon from '../../assets/icons/SendMoney';
import NewExpenseIcon from '../../assets/icons/NewExpense';

const Dashboard = () => {
  return (
    <Layout page="Dashboard">
      <section className={styles.dashboard}>
        <div className={styles.cardsContainer}>
          <Link className={styles.cards}>
            <WalletIcon />
            <span>$3140.70</span>
          </Link>
          <Link className={styles.cards}>
            <CashIcon />
            <span>$35.320</span>
          </Link>
          <Link className={styles.cards}>
            <NewExpenseIcon />
            <span>$15.200</span>
          </Link>
          <Link className={styles.cards}>
            <MoneyTransferredIcon />
            <span>$20.120</span>
          </Link>
        </div>

        <div className={styles.transactions}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          voluptates accusantium iste debitis nostrum, dignissimos omnis
          adipisci, praesentium, corrupti minus corporis at iure ipsa ratione
          laborum nisi atque veritatis id. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. In expedita blanditiis voluptas
          excepturi enim, aut temporibus totam! Ipsa modi mollitia quod.
          Deserunt quibusdam, animi quidem tempora magni facilis soluta
          temporibus.
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
