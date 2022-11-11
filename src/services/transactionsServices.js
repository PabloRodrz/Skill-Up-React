import axios from 'axios'
import store from '../redux/store'
import { changeStatus, getTransactions } from '../slices/transactionsSlice'
import api from '../utils/api.json'

export function readTransactions() {
  store.dispatch(changeStatus({ success: false, error: false, loading: true }))
  const token = JSON.parse(localStorage.getItem('token')).accessToken

  axios.get(`${api.url}${api.transactions}`,
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
