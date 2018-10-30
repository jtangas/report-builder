import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import reducer from 'core/reducers';

const enhancer = compose(applyMiddleware(thunk, promise));
const store = createStore(reducer, enhancer);

export default store;