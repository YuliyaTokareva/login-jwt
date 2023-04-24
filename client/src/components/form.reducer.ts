import { SEND_FORM, GET_USER_DATA, GET_USER_ERRORS } from './form.actions';
const initialState = {
  user: {},
  isSending: false,
  isOuth: false,
  errors: []
};

const formReduser = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FORM: {
      return {
        ...state,
        isSendForm: action.payload.isSendForm,
        user: {}
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,

        user: action.payload.userData,
        isOuth: true,
        errors: []
      };
    }
    case GET_USER_ERRORS: {
      return {
        ...state,
        errors: [action.payload.loginErrors]
      };
    }
    default:
      return state;
  }
};
export default formReduser;
