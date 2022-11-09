import { useState } from 'react';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';
import styled from './SendMoney.module.css';
import Swal from 'sweetalert2';

const SendMoney = () => {
  const [sendMoney, setSendMoney] = useState({
    email: '',
    concept: '',
    amount: '',
  });

  const handleChange = (e) => {
    setSendMoney((prevSendMoney) => ({
      ...prevSendMoney,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      sendMoney.email === '' ||
      sendMoney.concept === '' ||
      sendMoney.amount === ''
    ) {
      Swal.fire({
        title: 'Error',
        text: 'All fields must be completed',
        icon: 'warning',
      });
      return;
    }
  };
  return (
    <Layout page='Send money'>
      <div className={styled.container}>
        <div className={styled.inputContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styled.formInputs}>
              <div className={styled.inputDiv}>
                <label>Recipient Email</label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  value={sendMoney.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styled.inputDiv}>
                <div>
                  <label htmlFor='country'>Concept</label>
                </div>
                <select
                  id='concept'
                  name='concept'
                  value={sendMoney.concept}
                  onChange={handleChange}
                >
                  <option value='default'>---Select one option---</option>
                  <option value='Others'>Others</option>
                  <option value='Food'>Food</option>
                  <option value='Clothes'>Clothes</option>
                </select>
              </div>
              <div className={styled.inputDiv}>
                <label>Amount</label>
                <input
                  type='number'
                  id='amount'
                  name='amount'
                  value={sendMoney.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='btn'>
              <Button text={'send'} options={{ uppercase: true }}></Button>
            </div>
          </form>
        </div>
        <div className={styled.resumeContainer}>
          {sendMoney.email ? (
            <>
              <h1>Resume</h1>
              <span className={styled.email}>{sendMoney.email}</span>
              <span className={styled.concept}>{sendMoney.concept}</span>
              {sendMoney.amount && (
                <span className={styled.amount}>${sendMoney.amount}</span>
              )}
            </>
          ) : (
            <p className={styled.resume}>
              Your transaction resume will be available here
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SendMoney;
