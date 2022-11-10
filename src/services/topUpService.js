import axios from 'axios';
const topUpMoney = async (postData, accountId, token) => {
  return await axios.post(
    `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${accountId}`,
    postData,
    { headers: { Authorization: 'Bearer ' + token } }
  );
};

export const getAccountId = async (token) => {
  return await axios.get(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/me',
    { headers: { Authorization: 'Bearer ' + token } }
  );
};

export default topUpMoney;
