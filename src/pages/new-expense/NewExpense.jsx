import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';
import styled from './NewExpense.module.css';

const NewExpense = () => {
  const [expensesStorage, setExpensesStorage] = useState([])
  const [newExpense, setNewExpense] = useState({
    concept: '',
    date: '',
    amount: '',
    currency: '',
  });

  const handleLocalStorage = () => {
    const expenses = localStorage?.getItem('expenses')
    if (expenses !== null) {
      setExpensesStorage([...expenses, newExpense])
    }

    if (expensesStorage.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expensesStorage))
    } else {
      localStorage.setItem('expenses', JSON.stringify(newExpense))
    }
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
    }
    // reset();
  };
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
                  <option value="PESO">$</option>
                  <option value="DOLAR">USD</option>
                  <option value="EURO">€</option>
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
          <h2>Expenses history</h2>
          <table className={styled.table}>
            <thead>
              <tr>
                <th scope="col">Concept</th>
                <th scope="col">Currency</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Concept">concept</td>
                <td data-label="Currency">currency</td>
                <td data-label="Amount">amount</td>
                <td data-label="Date">date</td>
              </tr>
              <tr>
                <td data-label="Concept">concept</td>
                <td data-label="Currency">currency</td>
                <td data-label="Amount">amount</td>
                <td data-label="Date">date</td>
              </tr>
              <tr>
                <td data-label="Concept">concept</td>
                <td data-label="Currency">currency</td>
                <td data-label="Amount">amount</td>
                <td data-label="Date">date</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default NewExpense;
