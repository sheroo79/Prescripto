import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const payFee = createAsyncThunk(
  'fee/payFee',
  async (appointmentId,thunkAPI)=>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://doc-q-book.vercel.app/api/pay-fee',
        { appointmentId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const feeSlice = createSlice({
  name : 'fee',
  initialState : {
    loading : false,
    success : false,
    error : null
  },
  reducers : {
      resetFeeState : (state)=> {
        state.loading = false;
        state.success = false;
        state.error = null;
      }
  },
  extraReducers : (builder)=>{
    builder.addCase(payFee.pending, (state)=>{
        state.loading = true; 
        state.success = false;
        state.error = null;
    })
    .addCase(payFee.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(payFee.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Something went wrong';
      });
  }
})
export const { resetFeeState } = feeSlice.actions;
export default feeSlice.reducer;