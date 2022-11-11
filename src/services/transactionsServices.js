import axios from 'axios'
import store from '../redux/store'
import { changeExpenses, changeStatus, getTransactions } from '../slices/transactionsSlice'
import api from '../utils/api.json'

export async function readTransactions() {
  store.dispatch(changeStatus({ success: false, error: false, loading: true }))
  const token = JSON.parse(localStorage.getItem('token')).accessToken
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
  SearchSenderUser(res.data)
}

export function navTransactions(pagePath) {
  store.dispatch(changeStatus({ success: false, error: false, loading: true }))
  const token = JSON.parse(localStorage.getItem('token')).accessToken

  axios.get(`${api.url}${pagePath}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
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
    const { id, first_name, last_name, email, points, roleId } = user.data

    transactions.push({ ...d, sender_user: { id, first_name, last_name, email, points, roleId } })
  }

  store.dispatch(getTransactions({ data: transactions, nextPage, previousPage }))
  store.dispatch(changeStatus({ success: true, error: false, loading: false }))
}
