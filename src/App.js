

import React from 'react';
import Home from './components/Home'
import { Provider } from 'react-redux'
import store from './redux/store'
export default props => {
  return <Provider store={store}><Home/></Provider>
};
