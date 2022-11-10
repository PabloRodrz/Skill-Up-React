import styled from './topUpMoney.module.css'
import { useEffect, useState } from 'react'
import topUpMoney from '../../services/topUpService'
import { getAccountId } from '../../services/topUpService'

const TopUpMoney = () => {
    //add redux for loading, success and error
    //layout

    const user = JSON.parse(localStorage.getItem("user"))
    const id = user?.id
    const token = JSON.parse(localStorage.getItem("token"))
    const [accountId, setAccountId] = useState(0)
    const { accessToken } = token
    useEffect(() => {
        getAccountId(accessToken).then(res => {
            setAccountId(res.data[0].id)
            console.log(res.data)
        })

    }, [])
    const [addMoney, setAddMoney] = useState({
        amount: 0,
        concept: "",
        currency: ""
    })
    console.log(accountId)
    const handleOnChange = e => {
        setAddMoney(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleOnClick = e => {
        if (addMoney.amount > 0 && addMoney.concept !== "" && addMoney.currency !== "") {

            topUpMoney({ amount: +addMoney.amount, concept: addMoney.concept, type: "topup" }, accountId, accessToken)
                .then(res => console.log(res.data))
                .catch(e => console.log(e))
        }
    }
    return (
        <>
            <div className={styled.title}>
                <h1>Top up money</h1>
            </div>
            <div className={styled.container}>
                <div className={styled.wrapper}>
                    <div className={styled.inputs}>
                        <div className={styled.inputDiv}>
                            <label>Concept</label>
                            <select required name="concept" onChange={handleOnChange}>
                                <option hidden value="">Choose a concept</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                        <div className={styled.inputDiv}>
                            <label>Amount</label>
                            <input required name="amount" type="number" pattern='[0-9]+' onChange={handleOnChange} />
                        </div>
                        <div className={styled.inputDiv}>
                            <label>Currency</label>
                            <input required name="currency" type="text" onChange={handleOnChange} />
                        </div>

                        <div style={{ width: '12rem' }}>
                            <button onClick={handleOnClick}>ADD</button>
                        </div>
                    </div>
                </div>
                <div className={styled.userWrapper}>
                    <span>{user?.first_name}  {user?.last_name}</span>
                    <span>{user?.email}</span>
                    <span>{addMoney.amount}</span>
                </div>
            </div>
        </>
    )
}

export default TopUpMoney