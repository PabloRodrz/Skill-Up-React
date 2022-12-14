import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { modifyAccount } from '../../services/accountsService';
import { addMoneyPostAPI } from '../../slices/accountsSlice';
import Button from '../Button';
import Layout from '../Layout/Layout';
import styled from './TopUpMoney.module.css';

const TopUpMoney = () => {
  const { user, token } = useSelector(state => state.auth)
  const accountId = useSelector(state => state.accounts?.userAccount[0]?.id ? state.accounts?.userAccount[0]?.id : state.accounts.userAccount.id)
  const money = useSelector(state => state.accounts?.userAccount[0]?.money ? state.accounts?.userAccount[0]?.money : state.accounts.userAccount.money)
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.accounts.loading);
  const [addMoneyPost, setAddMoneyPost] = useState({
    amount: 0,
    concept: '',
    currency: '',
  });
  const objectForPostAPI = {
    postData: {
      amount: +addMoneyPost.amount,
      concept: addMoneyPost.concept,
      type: 'topup',
    },
    accountId,
    token,
  };
  const handleOnChange = (e) => {
    setAddMoneyPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleOnClick = (e) => {
    e.preventDefault()
    if (
      addMoneyPost.amount > 0 &&
      addMoneyPost.concept !== '' &&
      addMoneyPost.currency !== ''
    ) {
      dispatch(addMoneyPostAPI(objectForPostAPI));
      modifyAccount({ amountToTransfer: parseInt(addMoneyPost.amount) + parseInt(money) })
    }else{
      Swal.fire({
        title: 'Error',
        text: 'All fields must be completed',
        icon: 'warning',
      });
    }
  };
  const currencies = {ARS: "$", USD: "$", EUR: "€"}

  return (
    <Layout page="Add money">

        <div className={styled.container}>
          <div className={styled.inputContainer}>
            <form>
              <div className={styled.formInputs}>
                <div className={styled.inputDiv}>
                  <label>Concept</label>
                  <select required name="concept" onChange={handleOnChange}>
                    <option hidden value="">
                      Choose a concept
                    </option>
                    <option value="others">Top up</option>
                  </select>
                </div>
                <div className={styled.inputDiv}>
                  <label>Amount</label>
                  <input
                    className={styled.inputTopup}
                    required
                    name="amount"
                    type="number"
                    pattern="[0-9]+"
                    onChange={handleOnChange}
                  />
                </div>
                <div className={styled.inputDiv}>
                <label>Currency</label>
                <select
                  className={styled.inputTopup}
                  name="currency"
                  onChange={handleOnChange}
                  value={ addMoneyPost.currency }
                  
                >
                  <option hidden value="default">
                    Choose currency
                  </option>
                  <option value="ARS">ARS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                </div>

                <div className="btn">
                  <Button
                    action={handleOnClick}
                    text={isLoading ? "processing" : "ADD"}
                    variant="primary"
                    options={{ uppercase: true }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={styled.resumeContainer}>
            {addMoneyPost.amount ? (
              <>
                <h1>Resume</h1>
                <span>
                  {user?.first_name} {user?.last_name}
                </span>
                <span className={styled.email}>{user?.email}</span>
                <span
                  className={styled.amount}
                >{`${currencies[addMoneyPost.currency] ? currencies[addMoneyPost.currency] : "$"  }${addMoneyPost.amount}`}</span>
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

export default TopUpMoney;
