import axios from 'axios'
import store from '../redux/store'
import { getTransactions } from '../slices/transactionsSlice'
import api from '../utils/api.json'

export async function readTransactions() {
  const token = JSON.parse(localStorage.getItem('token')).accessToken

  const res = await axios.get(`${api.url}${api.transactions}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
  ).catch(error => console.log(error))

  const { nextPage, previousPage, data } = res.data
  let transactions = []

  for (const d of data) {
    const user = await axios.get(`${api.url}${api.users}/${d.userId}`).catch(error => console.log(error))
    const { id, first_name, last_name, email, points, roleId } = user.data
    delete d.userId

    transactions.push({ ...d, sender_user: { id, first_name, last_name, email, points, roleId } })
  }

  store.dispatch(getTransactions({ data: transactions, nextPage, previousPage }))
}
