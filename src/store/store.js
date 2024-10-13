import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import productsReducer from './slices/productsSlice';
import groceryReducer from './slices/grocerySlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productsReducer,
    grocery: groceryReducer,
  },
});

export default function AppProvider({children}) {
  return <Provider store={store}>{children}</Provider>;
}
