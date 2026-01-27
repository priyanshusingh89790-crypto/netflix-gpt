import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import MovieSlice from "./movieSlice";


const store = configureStore({
    reducer: {
        user: UserSlice,
        movies: MovieSlice,
    },
    devTools: true,
})

export default store;