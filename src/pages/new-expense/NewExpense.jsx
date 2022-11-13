import { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';
import styled from './NewExpense.module.css';

const NewExpense = () => {
  const user = useSelector(state => state.auth.user)
  const [expensesData, setExpensesData] = useState(JSON.parse(localStorage.getItem('expenses'))?.data ?? [])
  const [newExpense, setNewExpense] = useState({
    concept: '',
    date: '',
    amount: '',
    currency: '',
  });

  const handleLocalStorage = () => {
    const { data } = JSON.parse(localStorage?.getItem('expenses')) ?? []

    if (data && data?.length) {
      localStorage.setItem('expenses', JSON.stringify({
        lsUser: { id: user?.id },
        data: [...data, newExpense]
      }))
    } else {
      localStorage.setItem('expenses', JSON.stringify({ lsUser: { id: user?.id }, data: [newExpense] }))
    }

    setExpensesData(JSON.parse(localStorage.getItem('expenses'))?.data)
  }

  const handleChange = (e) => {
    setNewExpense((prevExpenses) => ({
      ...prevExpenses,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newExpense.concept === '' ||
      newExpense.date === '' ||
      newExpense.amount === '' ||
      newExpense.currency === ''
    ) {
      Swal.fire({
        title: 'Error',
        text: 'All fields must be completed',
        icon: 'warning',
      });
      return;
    } else {
      handleLocalStorage()
      Swal.fire('', 'Expense added!', 'success')
    }
  };

  const currencies = {ARS: "$", USD: "$", EUR: "€"}

  return (
    <Layout page="Expenses">
      <div className={styled.container}>
        <div className={styled.inputContainer}>
          <form>
            <div className={styled.formInputs}>
              <div className={styled.inputDiv}>
                <label>Concept</label>
                <select
                  name="concept"
                  onChange={handleChange}
                  value={newExpense.concept}
                >
                  <option hidden value="default">
                    Choose a concept
                  </option>
                  <option hidden value="">Choose a concept</option>
                  <option value="Payment">Payment</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Food">Food</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Transport">Transport</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className={styled.inputDiv}>
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  value={newExpense.date}
                />
              </div>
              <div className={styled.inputDiv}>
                <label>Amount</label>
                <input
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  value={newExpense.value}
                  min="1"
                  pattern="[0-9]"
                />
              </div>
              <div className={styled.inputDiv}>
                <label>Currency</label>
                <select
                  name="currency"
                  onChange={handleChange}
                  value={newExpense.currency}
                >
                  <option hidden value="default">
                    Choose currency
                  </option>
                  <option value="ARS">ARS</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
            <div className="btn">
              <Button
                action={handleSubmit}
                text="add"
                options={{ uppercase: true }}
              ></Button>
            </div>
          </form>
        </div>
        <div className={styled.resumeContainer}>
          <h2>{expensesData.length ? 'Expenses history' : 'There are not expenses'}</h2>
          {
            expensesData.length

              ?
              <div className={styled.table}>
              <table  >
                <thead>
                  <tr>
                    <th className={ styled.textTable } scope="col">Concept</th>
                    <th  className={ styled.textTable } scope="col">Currency</th>
                    <th  className={ styled.textTable }  scope="col">Amount</th>
                    <th  className={ styled.textTable } scope="col">Date</th>
                    <th   className={ styled.textTable } scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    expensesData?.map((el, index) => (
                      <tr key={index}>
                        <td className={ styled.label } data-label="Concept">{el.concept}</td>
                        <td className={ styled.label } data-label="Currency">{el.currency}</td>
                        <td className={ styled.label } data-label="Amount"> { currencies[el.currency] }{el.amount}</td>
                        <td className={ styled.label } data-label="Date">{el.date}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              </div>
              :
              null
          }
        </div>
      </div>
    </Layout>
  );
};

export default NewExpense;
