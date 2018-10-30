const loadReportsAction = () => dispatch => new Promise((resolve, reject) => {
  try {
    fetch('/api/report')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'LOAD_REPORTS',
          payload: data.data,
        });
      });
    resolve('ok');
  } catch (err) {
    reject(err);
  }
});

const createReportAction = values => dispatch => new Promise((resolve, reject) => {
  try {
    fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.message);
          dispatch({
            type: 'ADD_NEW_REPORT',
            payload: data.data,
          });
        } else {
          console.log(data.message);
        }
      });
  } catch (err) {
    reject(err);
  }
});

export {
  loadReportsAction,
  createReportAction,
};
