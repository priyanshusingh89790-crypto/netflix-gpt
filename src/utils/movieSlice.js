import { createSlice } from "@reduxjs/toolkit";
const moviesSlice = createSlice({
    name: "movies",
    initialState:{nowPlayingMovies:[], popularMovies:[], topRatedMovies:[], upcomingMovies:[], aiMovie:{moviename:[], movieresult:[]}},
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
            const {moviename, movieresult}=action.payload;
            state.aiMovie.moviename = moviename;
            state.aiMovie.movieresult = movieresult;
        },
    }
})

export const { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcomingMovies, addAiMovie } = moviesSlice.actions;
export default moviesSlice.reducer;