import axios from 'axios'
const createAccount = async ({ creationDate, userId, token }) => {
  console.log("se llamó")
  console.log(creationDate, userId, token)
  return await axios.post('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/post_accounts',
    { creationDate: creationDate, money: 0, isBlocked: false, userId: userId }
    , { headers: { authorization: 'Bearer' + token } })
}

export default createAccount