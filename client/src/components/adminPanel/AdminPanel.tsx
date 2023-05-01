import * as React from 'react';
import { connect } from 'react-redux';
import * as formSelectors from '../form.selectors';
import * as formActions from '../form.actions';
const AdminPanel = ({ userData, logOutUser }) => {
  const handlerSubmitLogOut = (e) => {
    e.preventDefault();

    logOutUser(userData);
  };
  return (
    <div>
      <h1 className="App">{`Hi ${userData.email}`}</h1>
      <button onClick={(e) => handlerSubmitLogOut(e)}>Logout</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userData: formSelectors.userDataSelector(state)
  };
};
const mapDispatch = (dispatch) => {
  return {
    logOutUser: (userData) => dispatch(formActions.logOutUser(userData))
  };
};
export default connect(mapState, mapDispatch)(AdminPanel);
