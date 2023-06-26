import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthorized: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
  },
});

export const { setAuthorized } = userSlice.actions;
export default userSlice.reducer;
