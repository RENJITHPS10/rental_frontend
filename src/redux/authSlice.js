import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!sessionStorage.getItem('token'), // True if token exists
    role: sessionStorage.getItem('role') || null,       // Restore role from sessionStorage
    userId: sessionStorage.getItem('userId') || null,   // Restore userId from sessionStorage
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      // Persist to sessionStorage
      sessionStorage.setItem('role', action.payload.role);
      sessionStorage.setItem('userId', action.payload.userId);
      
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
      // Clear all auth-related items from sessionStorage
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('userId');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;