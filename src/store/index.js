import { configureStore, createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
  name: "demo",
  initialState: { email: "", name: "" },
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    
  },
});

const store = configureStore({
  reducer: demoSlice.reducer,
});

export const demoActions = demoSlice.actions;

export default store;
