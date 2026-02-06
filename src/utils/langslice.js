import { createSlice } from "@reduxjs/toolkit";
  const langslice = createSlice({
    name: "lang",
    initialState: {
        language: "en",
    },
    reducers: {
        changelanguage: (state, action) => {

            state.language = action.payload;
        },
    },
});

export default langslice.reducer;
export const { changelanguage } = langslice.actions;
