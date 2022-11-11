import axios from 'axios'
const createAccount = async ({ createdAt, userId, token }) => {
  return await axios.post('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts',
    { creationDate: createdAt, money: 0, isBlocked: false, userId: userId }
    , { headers: { authorization: 'Bearer ' + token } })
}

export default createAccount