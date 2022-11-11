import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MenuIcon from "../../assets/icons/MenuIcon"
import NextPageIcon from "../../assets/icons/NextPageIcon"
import PreviousPageIcon from "../../assets/icons/PreviousPageIcon"
import { navTransactions, readTransactions } from "../../services/transactionsServices"
import { changePage } from "../../slices/transactionsSlice"
import styles from './transactions.module.css'

export default function AuxComponent({ viewAll = false, viewPagination = true } = {}) {
  const USER = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, transactionPage, previousPage, nextPage, success, loading, error } = useSelector(state => state.transactions)
  let renderedComponent = 'Initial'
  const HandleChangePage = (page) => {
    navTransactions(page)
  }

  useEffect(() => {
    readTransactions()
  }, [])

  if (loading) {
    renderedComponent = <span className={styles.loader}>Cargando...</span>
  }

  if ((success || error) && data?.length === 0) {
    renderedComponent = <h3 className={styles.noTransactionsText}>There are not transactions to see</h3>
  }

  if (success && data?.length > 0) {
    renderedComponent = (
      <>
        <article className={styles.headTable}>
          <h4>Transaction history</h4>
          {
            viewAll ? <button onClick={() => { navigate('/transactions') }}>View all</button> : null
          }
        </article>

        <div className={viewAll ? styles.tableContainer : null}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Sender</th>
                <th scope="col">Concept</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col">Entry/spent</th>
                <th scope="col"></th>
                <th scope="col"></th>
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
                      <td data-label='Sender'>{!TRANSACTION_TO_ME ? 'self' : `${first_name} ${last_name}`}</td>
                      <td data-label='Concept'>{el.concept}</td>
                      <td data-label='Type'>{el.type}</td>
                      <td data-label='Date'>{DATE}</td>
                      <td
                        data-label='Entry/spent'
                        className={
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
        </div>

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

  return <main className={styles.container}>{renderedComponent}</main>
}
