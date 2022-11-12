import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../redux/store';
import { saveUserAccount } from '../slices/accountsSlice';

export const CreateAccount = ({ createdAt, id, token }) => {
  GetAccountId(token).then(res => {
    if (res.data.length === 0) {
      axios.post('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts', {
        creationDate: createdAt, money: 0, isBlocked: false, userId: id
      },
        { headers: { authorization: 'Bearer ' + token } })
        .then(res => {
          store.dispatch(saveUserAccount(res.data))
        })
        .catch(err => {
          if (err.status === 401) {
            Swal.fire(
              'Oops!',
              'You are unauthorized',
              'error'
            );
          }
          if (err.status === 403) {
            Swal.fire(
              'Oops!',
              'Forbidden access',
              'error'
            );
          }
          if (err.status === 500) {
            Swal.fire(
              'Oops!',
              'Internal server error. Try again later!',
              'error'
            );
          }
        })
    }

    store.dispatch(saveUserAccount(res.data))
  })
}

export const addMoney = async (postData, accountId, token) => {
  return await axios.post(`http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${accountId}`,
    postData,
    { headers: { Authorization: 'Bearer ' + token } }
  ).then(res => {
    if (res.status === 200) {
      Swal.fire('', 'Deposit done!', 'success');
    }
  })
    .catch((e) => {
      if (res.status === 400) {
        Swal.fire('Oops!', 'Not enough cash :(', 'error');
      }
      if (res.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized to do this transaction',
          'error'
        );
      }
      if (res.status === 403) {
        Swal.fire(
          'Oops!',
          'Source account or destination account blocked',
          'error'
        );
      }
      if (res.status === 404) {
        Swal.fire('Oops!', 'The account was not found', 'error');
      }
      if (res.status === 500) {
        Swal.fire(
          'Oops!',
          'Internal server error. Try again later!',
          'error'
        );
      }
    })
};

export const GetAccountId = async (token) => {
  const res = await axios.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/me',
    { headers: { Authorization: 'Bearer ' + token } }
  )
    .catch(err => {
      Swal.fire({
        icon: 'error',
        text: err?.response?.data?.error,
      })
    })

  return res
};

export const modifyAccount = ({ toAccountId, amountToTransfer }) => {
  const user = store?.getState()?.auth?.user
  const creationDate = user?.createdAt
  const token = store.getState()?.auth?.token
  const accountId = store.getState()?.accounts?.userAccount[0]?.id
  const destinationAccount = toAccountId ? toAccountId : accountId

  axios.put(`http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${destinationAccount}`, {
    creationDate,
    money: parseInt(amountToTransfer),
    isBlocked: false,
    userId: user?.id
  },
    { headers: { Authorization: 'Bearer ' + token } })


    .then(response => {
      GetAccountId(token).then(res => {
        store.dispatch(saveUserAccount(res.data))
      })
        .catch(err => {
          if (err.status === 400) {
            Swal.fire('Oops!', 'Not enough cash :(', 'error');
          }
          if (err.status === 401) {
            Swal.fire(
              'Oops!',
              'You are unauthorized to do this transaction',
              'error'
            );
          }
          if (err.status === 403) {
            Swal.fire(
              'Oops!',
              'Source account or destination account blocked',
              'error'
            );
          }
          if (err.status === 404) {
            Swal.fire('Oops!', 'The account was not found', 'error');
          }
          if (err.status === 500) {
            Swal.fire(
              'Oops!',
              'Internal server error. Try again later!',
              'error'
            );
          }
        })
    })


    .catch(err => {
      if (err.status === 400) {
        Swal.fire('Oops!', 'Not enough cash :(', 'error');
      }
      if (err.status === 401) {
        Swal.fire(
          'Oops!',
          'You are unauthorized to do this transaction',
          'error'
        );
      }
      if (err.status === 403) {
        Swal.fire(
          'Oops!',
          'Source account or destination account blocked',
          'error'
        );
      }
      if (err.status === 404) {
        Swal.fire('Oops!', 'The account was not found', 'error');
      }
      if (err.status === 500) {
        Swal.fire(
          'Oops!',
          'Internal server error. Try again later!',
          'error'
        );
      }
    })
}
