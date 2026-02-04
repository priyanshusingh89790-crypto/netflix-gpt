import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
    name: "movies",
    initialState:{nowPlayingMovies:[], popularMovies:[], topRatedMovies:[], upcomingMovies:[], aiMovie:[]},
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addAiMovie: (state, action) => {
            state.aiMovie = action.payload;
        },
    }
})

export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addAiMovie } = moviesSlice.actions;
export default moviesSlice.reducer;