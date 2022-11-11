import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { getAccountId } from '../../services/topUpService'
import { addMoneyPostAPI } from '../../slices/addMoneySlice'
import Button from '../Button'
import Layout from '../Layout/Layout'
import styled from './TopUpMoney.module.css'
const TopUpMoney = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = JSON.parse(localStorage.getItem("token"))
    const [accountId, setAccountId] = useState(0)
    const dispatch = useDispatch()
    const { accessToken } = token
    useEffect(() => {
        getAccountId(accessToken).then(res => {
            setAccountId(res.data[0].id)
        }).catch(e => Swal.fire(
            'Oops!',
            `We couldn't get your account id, try again later`,
            'error'
        ))

    }, [])
    const isLoading = useSelector(state => state.addMoney.loading)
    const [addMoneyPost, setAddMoneyPost] = useState({
        amount: 0,
        concept: "",
        currency: ""
    })
    const objectForPostAPI = {
        postData: { amount: +addMoneyPost.amount, concept: addMoneyPost.concept, type: "topup" }, accountId, accessToken,
    }
    const handleOnChange = e => {
        setAddMoneyPost(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleOnClick = e => {
        if (addMoneyPost.amount > 0 && addMoneyPost.concept !== "" && addMoneyPost.currency !== "") {
            dispatch(addMoneyPostAPI(objectForPostAPI))
        }
    }
    //falta setear el skeleton para el loading
    return (
        <Layout page='Add money'>
            {isLoading ? <h1>loading..</h1> : <>
                <div className={styled.title}>
                    <h1 className={styled.topUpTitle}>Top up money</h1>
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
                                <input className={styled.inputTopup} required name="amount" type="number" pattern='[0-9]+' onChange={handleOnChange} />
                            </div>
                            <div className={styled.inputDiv}>
                                <label>Currency</label>
                                <input className={styled.inputTopup} required name="currency" type="text" onChange={handleOnChange} />
                            </div>

                            <div style={{ width: '12rem' }}>
                                {/*  <button onClick={handleOnClick}>ADD</button> */}
                                <Button action={handleOnClick} text='ADD' variant='primary' options={{ uppercase: true }} />
                            </div>
                        </div>
                    </div>
                    <div className={styled.userWrapper}>
                        <span>{user?.first_name}  {user?.last_name}</span>
                        <span>{user?.email}</span>
                        <span>{`$${addMoneyPost.amount}`}</span>
                    </div>
                </div></>}
        </Layout>
    )
}

export default TopUpMoney