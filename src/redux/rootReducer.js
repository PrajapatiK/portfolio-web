import { combineReducers } from 'redux';
import rootSlice from "./rootSlice";
import authSlice from "./authSlice";

export const appReducer = combineReducers({
  root: rootSlice,
  auth: authSlice
});

export const rootReducer = (state, action) => {
  console.log('Root Reducer: ', action, action.type, action.paylod);
  if (action.type === 'LOGOUT' || action.type === 'root/resetRootState') {
    state = action.payload;
  }
  console.log('State: ', state);
  return appReducer(state, action);
};
