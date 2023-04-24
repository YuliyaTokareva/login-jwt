import * as React from 'react';
import { connect } from 'react-redux';
import * as formSelectors from '../form.selectors';

const ErrorsBlock = ({ userErrors }) => {
  return userErrors.map((el, id) => <p key={id}>{el}</p>);
};

const mapState = (state) => {
  return {
    userErrors: formSelectors.userErrorsSelector(state)
  };
};

export default connect(mapState)(ErrorsBlock);
