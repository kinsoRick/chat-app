/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentModal: '',
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    // WONTFIX: В каждом из экшенов открытия и закрытия придётся сравнивать
    // какое модальное окно открыто на данный момент с переданным окном
    // Если где-то появится баг того, что вызывается ещё не нужное окно
    // его тяжелее будет отследить так как закрытие и открытие может происходить
    // в разных частях кода
    toggleModal: (state, { payload }) => {
      state.currentModal = (state.currentModal === payload) ? '' : payload;
    },
  },
});

export const { actions } = modalsSlice;
export default modalsSlice.reducer;
