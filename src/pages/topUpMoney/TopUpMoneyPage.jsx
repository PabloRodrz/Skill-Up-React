import styled from './topUpMoneyPage.module.css'
import TopUpMoney from '../../components/topUpMoney/topUpMoney'
const TopUpMoneyPage = () => {
  return (
    <>
      <div className={styled.container}>
        <TopUpMoney />
      </div>
    </>
  )
}

export default TopUpMoneyPage