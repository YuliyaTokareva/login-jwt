import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as formActions from '../components/form.actions';
import * as formSelectors from '../components/form.selectors';
import Form from '../components/form/Form';
import AdminPanel from '../components/adminPanel/AdminPanel';
import ErrorsBlock from '../components/errorsBlock/ErrorsBlock';
import mainImg from '@img/mainImg.png';

import './home.scss';

interface HomeProps {
  userAuth: boolean;
  refreshUser: () => void;
  userErrors: string[];
  isLoading: boolean;
}

const Home: React.FC<HomeProps> = ({ userAuth, refreshUser, userErrors, isLoading }) => {
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <div className="main-content">
      <div className="left-part">
        <h1 className="title-text">{userAuth ? `Welcom!` : 'Login or Register'}</h1>
        <div className="left-part__main-block-info">
          {isLoading ? 'Loading...' : '' || !userAuth ? <Form /> : <AdminPanel />}
        </div>
        <div className="left-part__error-message"> {!userErrors ? '' : <ErrorsBlock />}</div>
      </div>
      <div className="right-part" style={{ backgroundImage: `url(${mainImg})` }}></div>
    </div>
  );
};

const mapState = (state) => {
  return {
    userAuth: formSelectors.userAuthSelector(state),
    userErrors: formSelectors.userErrorsSelector(state),
    isLoading: formSelectors.isLoadingSelector(state)
  };
};

const mapDispatch = (dispatch) => {
  return {
    refreshUser: () => dispatch(formActions.refreshUser())
  };
};

export default connect(mapState, mapDispatch)(Home);
