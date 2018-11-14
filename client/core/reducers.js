import { combineReducers } from 'redux';

import auth from 'features/auth/reducer';
import user from 'features/user/reducer';
import reports from 'features/reports/reducer';

export default combineReducers({
  auth,
  user,
  reports,
});
