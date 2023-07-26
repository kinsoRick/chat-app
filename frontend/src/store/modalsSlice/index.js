/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModal: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state.currentModal = (state.currentModal === payload) ? '' : payload;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
