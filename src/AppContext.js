import { useReducer, createContext } from 'react';
import api from './common/api';
import { TOKEN } from './common/constant';

const initialState = {
  currentUser: null,
  authToken: localStorage.getItem(TOKEN),
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: payload || {} };
    case 'SET_AUTHENTICATED':
      return { ...state, authenticated: payload || false };
    case 'SET_TOKEN':
      localStorage.setItem(TOKEN, payload);
      return { ...state, authToken: payload };
    case 'SET_CONTACTS':
      return { ...state, contacts: payload || [] };
    default:
      return { ...state };
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => {},
});

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getToken = () => {
    return localStorage.getItem(TOKEN) || null;
  };

  const isAuthenticated = () => {
    return state.authenticated;
  };

  const initializeAuth = (authToken, userData) => {
    const token = authToken || getToken();
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      //   const userData = jwtDecode(token);
      dispatch({ type: 'SET_TOKEN', data: token });
      dispatch({ type: 'SET_AUTHENTICATED', data: true });
      dispatch({ type: 'SET_CURRENT_USER', data: userData });
    }
  };

  const value = { state, dispatch, initializeAuth, isAuthenticated, getToken };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
