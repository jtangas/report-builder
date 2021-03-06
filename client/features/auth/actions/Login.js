export default data => dispatch => {
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: 'LOGIN_ACTION',
        payload: data,
      });
      resolve('ok');
    } catch (err) {
      reject(err);
    }
  });
};