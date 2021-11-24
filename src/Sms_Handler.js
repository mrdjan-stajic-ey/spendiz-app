const {
  default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {default: axios} = require('axios');

module.exports = async taskData => {
  const token = await AsyncStorage.getItem('JWT');
  axios
    .post('http://10.0.2.2:3000/sms', taskData, {
      //TODO: make prebuild script that will change the base url
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }) //TODO: there should be some fallback to this, app should check for timestamps in sms-es db vs client i am not sure this will work
    //there is a problem with native also;
    .then(res => {
      //   console.log('Sms sent', res);
    })
    .catch(err => {
      //   console.log('Sms error', err);
      return err;
    });
};
