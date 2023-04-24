import * as React from 'react';
import { connect } from 'react-redux';
import * as formSelectors from '../form.selectors';
const AdminPanel = ({ userData }) => {
  return (
    <div>
      <h1 className="App">{`Hi ${userData.email}`}</h1>
      <button>Logout</button>
    </div>
  );
};

const mapState = (state) => {
  return {
    userData: formSelectors.userDataSelector(state)
  };
};

export default connect(mapState)(AdminPanel);
