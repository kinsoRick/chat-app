/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getData from '../actions/getData';

const initialState = {
  entities: [],
  ids: [],
  status: 'idle',
  error: null,
  currentChannelId: -1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannel: (state, { payload }) => {
      state.entities = state.entities.map((entity) => {
        if (entity.id !== payload.id) return entity;
        return payload;
      });
    },
    removeChannel: (state, { payload }) => {
      state.entities = state.entities.filter((entity) => entity.id !== payload);
    },
    addChannel: (state, { payload }) => {
      if (state.ids.includes(payload.id)) return;
      state.entities.push(payload);
      state.ids.push(payload.id);
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
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
      })
      .addCase(getData.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
