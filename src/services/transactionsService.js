import axios from 'axios'
import store from '../redux/store'
import { changeExpenses, changeStatus, getTransactions, handleTransferMoney } from '../slices/transactionsSlice'
import api from '../utils/api.json'
import Swal from 'sweetalert2'

export async function ReadTransactions() {
  store.dispatch(changeStatus({ success: false, error: false, loading: true }))
  const token = store?.getState()?.auth?.token
  const USER = store.getState().auth.user
  let auxExpense = 0, auxMoneyTransf = 0

  const res = await axios.get(`${api.url}${api.transactions}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    .catch(err => {
      console.log(err.message),
        store.dispatch(changeStatus({ success: false, error: true, loading: false }))
    })
  for (const d of res.data.data) {
    if (d.userId === USER.id && d.type === 'payment') {
      auxExpense += parseInt(d.amount)
    }

    // if (d.userId === USER.id && d.type === 'topup') {
    //    auxMoneyTransf += parseInt(d.amount)
    // }
  }

  store.dispatch(changeExpenses({
    expenses: auxExpense,
    moneyTransferred: auxMoneyTransf,
    totalExpending: auxExpense + auxMoneyTransf
  }))
  await SearchSenderUser(res.data)
}

export function NavTransactions(pagePath) {
  store.dispatch(changeStatus({ success: false, error: false, loading: true }))

  axios.get(`${api.url}${pagePath}`,
    {
      headers: {
        Authorization: 'Bearer ' + store.getState().auth.token,
      }
    })
    .then(res => {
      SearchSenderUser(res.data)
    })
    .catch(err => {
      console.log(err.message),
        store.dispatch(changeStatus({ success: false, error: true, loading: false }))
    })
}

async function SearchSenderUser({ nextPage, previousPage, data }) {
  let transactions = []

  for (const d of data) {
    const user = await axios.get(`${api.url}${api.users}/${d.userId}`).catch(error => console.log(error))
    const { id, first_name, last_name, email, points, roleId } = user?.data

    transactions.push({ ...d, sender_user: { id, first_name, last_name, email, points, roleId } })
  }

  store.dispatch(getTransactions({ data: transactions, nextPage, previousPage }))
  store.dispatch(changeStatus({ success: true, error: false, loading: false }))
}

export const transferMoney = async ({ concept, CBU, amount, token }) => {
  store.dispatch(handleTransferMoney({ sendMoneySuccess: false, sendMoneyError: false, sendMoneyLoading: true }))
  const type = "payment"
  return await axios.post(`http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${CBU}`,
    { type: type, concept: concept, amount: amount },
    { headers: { Authorization: 'Bearer ' + token } }
  ).then(res => {
    store.dispatch(handleTransferMoney({ sendMoneySuccess: true, sendMoneyError: false, sendMoneyLoading: false }))
    if (res.status === 200) {
      Swal.fire('', 'Deposit done!', 'success');
    }
  })
    .catch((e) => {
      store.dispatch(handleTransferMoney({ sendMoneySuccess: false, sendMoneyError: true, sendMoneyLoading: false }))
      if (e.status === 400) {
        Swal.fire('Oops!', 'Not enough cash :(', 'error');
      }
      if (e.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized to do this transaction',
          'error'
        );
      }
      if (e.status === 403) {
        Swal.fire(
          'Oops!',
          'Source account or destination account blocked',
          'error'
        );
      }
      if (e.status === 404) {
        Swal.fire('Oops!', 'The account was not found', 'error');
      }
      if (e.status === 500) {
        Swal.fire(
          'Oops!',
          'Internal server error. Try again later!',
          'error'
        );
      }
    })
};