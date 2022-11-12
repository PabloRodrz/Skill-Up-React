import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';
import { transferMoney } from '../../services/transactionsService';
import styled from './SendMoney.module.css';

const SendMoney = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const isLoading = useSelector(state => state.transactions.sendMoneyLoading)
  const isSuccess = useSelector(state => state.transactions.sendMoneySuccess)

  useEffect(() => {
    if (isSuccess) {
      setSendMoney({
        CBU: '',
        concept: '',
        amount: '',
      })
    }
  }, [isLoading, isSuccess]);

  const [sendMoney, setSendMoney] = useState({
    CBU: '',
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
      sendMoney.CBU === '' ||
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
                <label>CBU</label>
                <input
                  type='number'
                  name='CBU'
                  value={sendMoney.CBU}
                  pattern='[0-9]'
                  onChange={handleChange}
                />
              </div>
              <div className={styled.inputDiv}>
                <label>Concept</label>
                <select
                  name='concept'
                  value={sendMoney.concept}
                  onChange={handleChange}
                >
                  <option hidden value='default'>Choose a concept</option>
                  <option value='Payment'>Payment</option>
                  <option value='Transfer'>Transfer</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
              <div className={styled.inputDiv}>
                <label>Amount</label>
                <input
                  type='number'
                  name='amount'
                  value={sendMoney.amount}
                  onChange={handleChange}
                  min='1'
                  pattern='[0-9]'
                />
              </div>
            </div>
            <div className='btn'>
              <Button action={
                () => {
                  transferMoney({ ...sendMoney, token: token })
                  console.log(sendMoney)
                }}
                text={isLoading ? "processing" : 'send'} options={{ uppercase: true }}></Button>
            </div>
          </form>
        </div>
        <div className={styled.resumeContainer}>
          {sendMoney.CBU ? (
            <>
              <h1>Resume</h1>
              <b>CBU</b><br />
              <span >{sendMoney.CBU}</span>
              {sendMoney.concept && <>
                <b>Concept</b> <br />
                <span>{sendMoney.concept}</span>
              </>}
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
