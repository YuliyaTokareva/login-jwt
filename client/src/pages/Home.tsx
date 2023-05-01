import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import * as formActions from '../components/form.actions';
import * as formSelectors from '../components/form.selectors';
import Form from '../components/Form';
import AdminPanel from '../components/adminPanel/AdminPanel';
import ErrorsBlock from '../components/errorsBlock/ErrorsBlock';

function Home({ userAuth, refreshUser, userErrors, isLoadingSelector }) {
  useEffect(() => {
    // if (localStorage.getItem('token')) {
    //   refreshUser();
    // }
    refreshUser();
  }, []);
  if (isLoadingSelector) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>{!userAuth ? <Form /> : <AdminPanel />}</div>
      {!userErrors ? '' : <ErrorsBlock />}
    </>
  );
}
const mapState = (state) => {
  return {
    userData: formSelectors.userDataSelector(state),
    userAuth: formSelectors.userAuthSelector(state),
    userErrors: formSelectors.userErrorsSelector(state),
    isLoadingSelector: formSelectors.isLoadingSelector(state)
  };
};
const mapDispatch = (dispatch) => {
  return {
    refreshUser: () => dispatch(formActions.refreshUser())
  };
};
export default connect(mapState, mapDispatch)(Home);
