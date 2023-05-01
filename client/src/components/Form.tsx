import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as formActions from './form.actions';
import * as formSelectors from './form.selectors';

const Form = ({ sendLoginForm, userData, userAuth, postRegisterUser }) => {
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,

      [name]: value
    });
  };
  const handlerSubmitLogin = (e) => {
    e.preventDefault();

    sendLoginForm(dataForm);
  };

  const handlerSubmitRegister = (e) => {
    e.preventDefault();
    postRegisterUser(dataForm);
    // registrationUser(dataForm);
  };

  useEffect(() => {
    if (userData) {
      setDataForm({
        email: '',
        password: ''
      });
    }
  }, [userData]);

  return (
    <>
      <h1 className="App">{userAuth ? `Hi ${userData.email}` : 'Login or Register'}</h1>
      <form>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          value={dataForm.email}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={dataForm.password}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={(e) => handlerSubmitLogin(e)}>Login</button>
        <button onClick={(e) => handlerSubmitRegister(e)}>Register</button>
      </form>
    </>
  );
};

const mapState = (state) => {
  return {
    userData: formSelectors.userDataSelector(state),
    userAuth: formSelectors.userAuthSelector(state)
  };
};
const mapDispatch = (dispatch) => {
  return {
    sendLoginForm: (dataForm) => dispatch(formActions.postLoginUser(dataForm)),
    postRegisterUser: (dataForm) => dispatch(formActions.postRegisterUser(dataForm))
  };
};
export default connect(mapState, mapDispatch)(Form);
