import styled from './topUpMoney.module.css'
import { useState } from 'react'
import topUpMoney from '../../services/topUpService'
const TopUpMoney = () => {
    const [addMoney, setAddMoney] = useState({
        amount: 0,
        concept: "",
        currency: ""
    })

    const handleOnChange = e => {
        setAddMoney(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleOnClick = e => {
        if (addMoney.amount > 0 && addMoney.concept !== "" && addMoney.currency !== "") {
            let today = new Date()
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let asd = new Date().toJSON();
            topUpMoney({ amount: +addMoney.amount, concept: addMoney.concept, date: asd, type: "topup", accountId: 1, userId: 1, to_account_id: 1 })
                .then(res => console.log(res, axios.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users/1').then(res => console.log(res.data))))
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
                    <span>Destinatario</span>
                    <span>JuanCarlosPereasdsadsadsaz@gmail.com</span>
                    <span>$2500</span>
                </div>
            </div>
        </>
    )
}

export default TopUpMoney