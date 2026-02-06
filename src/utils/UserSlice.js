import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      const { uid, displayName, email, photoURL } = action.payload;
      return { uid, displayName, email, photoURL };
    },
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
