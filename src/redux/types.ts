export interface Movie {
  id: number;
  title: string;
  year: number;
  revenue: number;
  genre: string;
  description: string;
  director: string;
  actors: string;
  runtime: number;
  rating: number;
  votes: number;
  metascore: number;
}

export interface ViewMoviesTableProps {
  movies: Movie[];
}

export interface RootState {
  movies: {
    movieList: Movie[];
    originalMovieList: Movie[];
    alternativeMovieList: Movie[];
  };
}

export interface MovieState {
  movieList: Movie[];
  originalMovieList: Movie[];
  alternativeMovieList: Movie[];
}
