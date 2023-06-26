import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getData = createAsyncThunk('getData', async (token) => {
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = response;

  return data;
});

export default getData;
