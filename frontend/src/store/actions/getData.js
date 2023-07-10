import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getData = createAsyncThunk('getData', async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response;

    return data;
  } catch (err) {
    const errorCode = err.response?.data?.statusCode;
    return rejectWithValue(errorCode);
  }
});

export default getData;
