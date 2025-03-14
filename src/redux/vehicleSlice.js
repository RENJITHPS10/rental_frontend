import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    filters: {
      location: '',
      priceMax: '',
      type: '',
      fuelType: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { location: '', priceMax: '', type: '', fuelType: '' };
    },
  },
});

export const { setFilters, clearFilters } = vehicleSlice.actions;
export default vehicleSlice.reducer;