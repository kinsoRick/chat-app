/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import getData from '../actions/getData';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  status: 'idle',
  error: null,
  currentChannelId: -1,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.setAll,
    updateChannel: (state, { payload }) => {
      state.entities = state.entities.map((entity) => {
        if (entity.id !== payload.id) return entity;
        return payload;
      });
    },
    removeChannel: channelsAdapter.removeOne,
    addChannel: channelsAdapter.addOne,
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        const ids = channels.map((channel) => channel.id);

        state.ids = ids;
        state.entities = channels;
        state.currentChannelId = currentChannelId;
        state.status = 'fulfilled';
      });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
