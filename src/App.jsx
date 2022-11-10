// Components
import Error404 from './components/error404/Error404'
import Footer from './components/footer/Footer'

// Pages
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import SendMoney from './pages/send-money/SendMoney'
import TopUpMoneyPage from './pages/topUpMoney/TopUpMoneyPage';

// Libraries
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  const TOKEN = JSON.parse(localStorage.getItem('token'))?.accessToken ?? false
  const USER = useSelector(state => state.auth.user) ?? false

  return (
    <div>
      {
        TOKEN && USER
          ?
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/sendmoney' element={<SendMoney />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
          :
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<RegisterPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
            <Route path='/addmoney' element={TopUpMoneyPage} />
          </Routes>
      }
      <Footer />
    </div>
  );
}

export default App;
