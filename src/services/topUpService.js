import axios from 'axios';

const topUpMoney = (postData) => {
  axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/transactions',
    postData
  );
};

export default topUpMoney;
