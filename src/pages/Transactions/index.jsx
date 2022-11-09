import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import MenuIcon from '../../assets/icons/MenuIcon'
import { readTransactions } from '../../services/transactionsServices'
import styles from './transactions.module.css'

function Transactions({ viewAll = false } = {}) {
  const navigate = useNavigate()
  const { data } = useSelector(state => state.transactions)

  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    readTransactions()
  }, [])

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h4>Transaction history</h4>
        {
          viewAll ? <button onClick={() => { navigate('/') }}>View all</button> : null
        }
      </header>

      {
        data.length
          ? <table className={styles.table} rules='rows'>
            <tbody>
              {
                data.map((el) => {
                  const { first_name, last_name } = el?.sender_user
                  const DATE = new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }).format(new Date(el.createdAt))
                  const TRANSACTION_TO_ME = el.to_account_id === user.id

                  return (
                    <tr key={el.id}>
                      <td>{`${first_name} ${last_name}`}</td>
                      <td>{el.concept}</td>
                      <td>{el.type}</td>
                      <td>{DATE}</td>
                      <td className={
                        TRANSACTION_TO_ME
                          ? styles.conceptGreen
                          : styles.conceptRed}
                      >
                        {TRANSACTION_TO_ME ? 'entry' : 'spent'}</td>
                      <td>${el.amount}</td>
                      <td>
                        <Menu
                          menuButton={<MenuButton><MenuIcon /></MenuButton>}
                          transition
                        >
                          <MenuItem>Send money</MenuItem>
                          <MenuItem>Modify concept</MenuItem>
                        </Menu>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          : <h3>There are not transactions to see</h3>
      }
    </section>
  )
}

export default Transactions