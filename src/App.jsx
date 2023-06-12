// Components
import Error404 from './components/error404/Error404';
import Footer from './components/footer/Footer';

// Pages
import Dashboard from './pages/Dashboard/index.js';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import SendMoney from './pages/send-money/SendMoney';
import TopUpMoneyPage from './pages/topUpMoney/TopUpMoneyPage';
import Transactions from './pages/Transactions';

// Libraries
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NewExpense from './pages/new-expense/NewExpense';

function App() {
  const TOKEN = useSelector((state) => state.auth.token);
  const USER = useSelector((state) => state.auth.user);

  return (
    <div>
      {TOKEN && USER ? (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/addmoney" element={<TopUpMoneyPage />} />
          <Route path="/newexpense" element={<NewExpense />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

export default App;
