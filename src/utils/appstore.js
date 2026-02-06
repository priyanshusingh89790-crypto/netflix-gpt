import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./movieSlice";
import configSlice from "./configslice";
import langslice from "./langslice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        movies: MovieSlice,
        config: configSlice,
        language: langslice,
    },
    devTools: true,
})

export default store;