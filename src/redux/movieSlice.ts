import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, MovieState, RootState } from "./types";

const initialState: MovieState = {
  movieList: [],
  originalMovieList: [],
  alternativeMovieList: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    replaceMovieList: (state, action: PayloadAction<Movie[]>) => {
      state.movieList = action.payload;
      state.originalMovieList = action.payload;
      state.alternativeMovieList = [];
    },
    filterTop10Revenue: (state) => {
      const moviesWithRevenue = state.movieList.filter(
        (movie) => movie.revenue !== undefined
      );

      const sortedMovies = moviesWithRevenue
        .slice()
        .sort((a, b) => b.revenue - a.revenue);

      state.alternativeMovieList = sortedMovies.slice(0, 10);
    },
    filterTopRevenueByYear: (state, action: PayloadAction<number>) => {
      const selectedYear = action.payload;
      const filteredMovies = state.movieList
        .filter((movie) => movie.year === selectedYear)
        .sort((a, b) => b.revenue - a.revenue);

      state.alternativeMovieList = filteredMovies.slice(0, 10);
    },
    resetFilteredMovies: (state) => {
      state.alternativeMovieList = state.originalMovieList.slice();
    },
  },
});

export const {
  replaceMovieList,
  filterTop10Revenue,
  filterTopRevenueByYear,
  resetFilteredMovies,
} = movieSlice.actions;

export const selectAlternativeMovieList = (state: RootState) =>
  state.movies.alternativeMovieList;

export default movieSlice.reducer;
