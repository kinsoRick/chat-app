import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import userReducer from './userSlice';
import messagesReducer from './messagesSlice';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    user: userReducer,
  },
});

export default store;
