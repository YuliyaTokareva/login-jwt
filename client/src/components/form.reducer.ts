import { GET_USER_DATA, GET_USER_ERRORS, USER_LOGOUT, IS_LOADING } from './form.actions';
import { IUser } from '../models/IUser';
import { UserState } from '../models/UserState';

const initialState: UserState = {
  user: {},
  isLoading: false,
  isOuth: false,
  errors: []
};
interface FormReducerAction {
  type: string;
  payload: {
    userData: IUser;
    loginErrors: string;
  };
}
export interface FormState {
  formData: UserState;
}
const formReduser = (state = initialState, action: FormReducerAction) => {
  switch (action.type) {
    case IS_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        isOuth: false,
        user: {},
        errors: [`User isn't autorize`]
      };
    }
    case GET_USER_DATA: {
      return {
        ...state,
        isLoading: false,
        user: action.payload.userData,
        isOuth: true,
        errors: []
      };
    }
    case GET_USER_ERRORS: {
      return {
        ...state,
        isLoading: false,
        errors: [action.payload.loginErrors]
      };
    }
    default:
      return state;
  }
};
export default formReduser;
