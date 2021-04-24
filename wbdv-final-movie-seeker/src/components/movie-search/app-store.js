import { store } from '@risingstack/react-easy-state';
import MovieService from '../../services/movie-service'

// use 'appStore' instead of 'this' in the store methods to make them passable as callbacks
const appStore = store({
  movies: [],
  async findMoviesByTitle(movie) {
    appStore.movies = [];
    appStore.isLoading = true;
    const data = await MovieService.findMoviesByTitle(movie);
    appStore.movies = data.Search
    appStore.isLoading = false;
    console.log(appStore.movies)
  },
});

export default appStore;