import axios from 'axios';

const topUpMoney = async (postData) => {
  return await axios.post(
    'http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts',
    postData
  );
};

export default topUpMoney;
