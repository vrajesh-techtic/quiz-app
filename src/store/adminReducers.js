import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminData: {
      name: "",
      email: "",
      username: "",
      isVerified: false,
    },
  },

  reducers: {
    setAdminData(state, action) {
      const newData = action.payload;
      state.adminData.email = newData.email;
      state.adminData.name = newData.name;
      state.adminData.username = newData.username;
      state.adminData.isVerified = true;
    },
  },
});

export const adminActions = adminSlice.actions;
export const adminReducers = adminSlice.reducer;
