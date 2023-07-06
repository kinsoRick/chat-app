import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModal: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setCurrentModal: (state, { payload }) => {
      state.currentModal = (state.currentModal === payload) ? '' : payload;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
