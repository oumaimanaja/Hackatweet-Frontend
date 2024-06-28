import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, userid: null, tweetsNumber: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.username = action.payload.username;
      state.value.userid = action.payload.userid;
      state.value.tweetsNumber = action.payload.tweetsNumber;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
      state.value.username = null;
      state.value.userid = null;
      state.value.tweetsNumber = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
