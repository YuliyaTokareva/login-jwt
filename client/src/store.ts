import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import formReduser from './components/form.reducer';
import { UserState } from './models/UserState';

// const reducer = combineReducers({
//   formData: formReduser
// });
// // eslint-disable-next-line
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
// export default store;

export interface FormState {
  formData: UserState;
}

interface WindowWithReduxDevTools extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

const reducer = combineReducers<FormState>({
  formData: formReduser
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as WindowWithReduxDevTools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
