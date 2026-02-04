import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./movieSlice";
import configSlice from "./configslice";


const store = configureStore({
    reducer: {
        user: UserSlice,
        movies: MovieSlice,
        config: configSlice,
    },
    devTools: true,
})

export default store;