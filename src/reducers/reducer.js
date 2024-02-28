import { combineReducers } from "redux";
const initialState = {
    uid: "",
    name: "",
    email: "",
    login: "",
    token: "",
};
const userReducer = (
  state =initialState,
  action
) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
        login: true,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

const cryptoReducer = (
  state = {
    crypoData: [],
    error: { data: "", coinData: "", search: "" },
  },
  action
) => {
  switch (action.type) {
    case "SET_CRYPTO_DATA":
      return {
        ...state,
        cryptoData: action.payload,
      };
    case "SET_CRYPTO_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  crypto: cryptoReducer,
});

export default rootReducer;