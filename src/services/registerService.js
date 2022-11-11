import axios from "axios"
import store from "../redux/store"
import { saveUserInfo } from "../slices/userSlice"

// Register user
export const register = async (userData) => {
  const res = await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users',
    userData
  )
    .catch(err => { console.log(err.message) })

  store.dispatch(saveUserInfo(res?.data))
}