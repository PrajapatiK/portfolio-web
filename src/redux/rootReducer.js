import { combineReducers } from 'redux';
import rootSlice from "./rootSlice";
import authSlice from "./authSlice";

export const appReducer = combineReducers({
  root: rootSlice,
  auth: authSlice
});

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT' || action.type === 'root/resetRootState') {
    state = action.payload;
  }
  return appReducer(state, action);
};
