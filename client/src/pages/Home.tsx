import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import * as formActions from '../components/form.actions';
import * as formSelectors from '../components/form.selectors';
import Form from '../components/form/Form';
import AdminPanel from '../components/adminPanel/AdminPanel';
import ErrorsBlock from '../components/errorsBlock/ErrorsBlock';
import mainImg from '@img/mainImg.png';

import './home.scss';

function Home({ userAuth, refreshUser, userErrors, isLoadingSelector }) {
  useEffect(() => {
    refreshUser();
  }, []);
  if (isLoadingSelector) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <div className="left-part">
        <h1 className="title-text">{userAuth ? `Welcom!` : 'Login or Register'}</h1>
        <div className="left-part__main-block-info">{!userAuth ? <Form /> : <AdminPanel />}</div>

        <div className="left-part__error-message"> {!userErrors ? '' : <ErrorsBlock />}</div>
      </div>
      <div className="right-part" style={{ backgroundImage: `url(${mainImg})` }}>
        {/* <img src={`${mainImg}`} alt="bicycle in first screen" /> */}
      </div>
    </div>
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
