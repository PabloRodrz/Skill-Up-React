import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { readTransactions } from '../../services/transactionsServices'
import AuxComponent from './AuxComponent'
import styles from './transactions.module.css'

function Transactions({ viewAll = false, viewPagination = true } = {}) {
  useEffect(() => {
    readTransactions()
  }, [])

  return (
    <Layout page='Transactions'>
      <main className={styles.container}>
        <AuxComponent params={{ viewAll, viewPagination }} />
      </main>
    </Layout>
  )
}

export default Transactions