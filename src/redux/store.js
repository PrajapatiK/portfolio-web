import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './rootReducer';


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'otherReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: isThisDevlopmentEnv(),
  // enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});

function isThisDevlopmentEnv() {
  const devEnvs = ['development', 'DEVELOPMENT'];
  return (devEnvs.includes(process.env.REACT_APP_ENV));
}

export default store;
export const persistor = persistStore(store);