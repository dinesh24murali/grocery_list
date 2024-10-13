import {createSlice} from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    number: 0,
  },
  reducers: {
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    increment: (state, action) => {
      state.number = state.number + 1;
    },
    decrement: (state, action) => {
      state.number = state.number - 1;
    },
  },
});

export const {setNumber, increment, decrement} = appSlice.actions;

export const makeApiCall = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/data.json');
      const data = await response.json();
      dispatch(setNumber(data.data.number));
      return data.data.number;
    } catch (e) {
      dispatch(setNumber(0));
      return '';
    }
  };
};

export default appSlice.reducer;
