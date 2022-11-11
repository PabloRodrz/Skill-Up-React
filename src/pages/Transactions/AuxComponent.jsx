import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MenuIcon from "../../assets/icons/MenuIcon"
import NextPageIcon from "../../assets/icons/NextPageIcon"
import PreviousPageIcon from "../../assets/icons/PreviousPageIcon"
import { navTransactions } from "../../services/transactionsServices"
import styles from './transactions.module.css'

export default function AuxComponent({ params }) {
  const { viewAll, viewPagination } = params
  const USER = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, transactionPage, previousPage, nextPage, success, loading, error } = useSelector(state => state.transactions)

  const HandleChangePage = (page) => {
    navTransactions(page)
  }

  if (loading) {
    return <span className={styles.loader}>Cargando...</span>
  }

  if ((success || error) && data?.length === 0) {
    return <h3 className={styles.noTransactionsText}>There are not transactions to see</h3>
  }

  if (success) {
    return (
      <>
        <section className={styles.headTable}>
          <h4>Transaction history</h4>
          {
            viewAll ? <button onClick={() => { navigate('/transactions') }}>View all</button> : null
          }
        </section>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Concept</th>
              <th>Type</th>
              <th>Date</th>
              <th>Entry/spent</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((el) => {
                const { first_name, last_name } = el?.sender_user
                const DATE = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                  .format(new Date(el.createdAt))
                const TRANSACTION_TO_ME = el?.userId !== USER?.id

                return (
                  <tr key={el.id}>
                    <td>{!TRANSACTION_TO_ME ? 'self' : `${first_name} ${last_name}`}</td>
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
                        {TRANSACTION_TO_ME ? <MenuItem>Send money</MenuItem> : null}
                        <MenuItem>Modify concept</MenuItem>
                      </Menu>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {viewPagination ?
          (previousPage || nextPage) ?
            <section className={styles.tfootTable}>
              {
                previousPage ?
                  <button
                    className={styles.tfootPrev}
                    onClick={() => {
                      HandleChangePage(previousPage)
                      dispatch(changePage(transactionPage - 1))
                    }}
                  >
                    <PreviousPageIcon />
                  </button>
                  :
                  <div />
              }
              <small className={styles.tfootPage}>{transactionPage}</small>
              {
                nextPage ?
                  <button
                    className={styles.tfootNext}
                    onClick={() => {
                      HandleChangePage(nextPage)
                      dispatch(changePage(transactionPage + 1))
                    }}
                  >
                    <NextPageIcon />
                  </button>
                  :
                  <div />
              }
            </section>
            :
            null
          :
          null
        }
      </>
    )
  }
}
