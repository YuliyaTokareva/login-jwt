import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import * as formActions from './components/form.actions';
import * as formSelectors from './components/form.selectors';
import Form from '../src/components/Form';
import './App.css';
import { checkAuth } from '../src/components/formGateway';
import Home from './pages/Home';

function App() {
  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     // const token = localStorage.getItem('token');
  //     checkAuth();
  //   }
  // }, []);

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
