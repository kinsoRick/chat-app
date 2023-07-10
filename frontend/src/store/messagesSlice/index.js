/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import getData from '../actions/getData';
import { actions as channelsActions } from '../channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { messages } = payload;
        const ids = messages.map((message) => message.id);

        state.ids = ids;
        state.entities = messages;
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state.ids = state.ids.filter((id) => id !== payload);
        state.entities = state.entities.filter((message) => message.channelId !== payload);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export default messagesSlice.reducer;
