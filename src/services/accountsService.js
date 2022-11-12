import axios from 'axios';
import Swal from 'sweetalert2';

export const CreateAccount = ({ createdAt, userId, token }) => {
  GetAccounts(token).then(res => {
    if (res.data.length === 0) {
      axios.post('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts', {
        creationDate: createdAt, money: 0, isBlocked: false, userId: userId
      },
        { headers: { authorization: 'Bearer ' + token } })
        .then(res => { })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            text: err?.response?.data?.error,
          })
        })
    }
  })
}

export const topUpMoney = async (postData, accountId, token) => {
  return await axios.post(`http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${accountId}`,
    postData,
    { headers: { Authorization: 'Bearer ' + token } }
  );
};

export const GetAccounts = async (token) => {
  const res = await axios.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/me',
    { headers: { Authorization: 'Bearer ' + token } }
  )
    .catch(err => {
      console.log('GETAccount: ', err)
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.error,
      })
    })

  return res
};
