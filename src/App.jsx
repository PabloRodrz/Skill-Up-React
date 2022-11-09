// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// Pages
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import SendMoney from './pages/send-money/SendMoney';

// Libraries
import { Routes, Route } from 'react-router-dom';
//header no va siempre. Agregar sidebar de manera condicional.
function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/sendmoney' element={<SendMoney />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
