import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({

  movies,
  filterMovies,
  setFilterMovies,
  savedMovies,

  onMoviesLike,
  onMoviesDelete,
  onSearchMovies
}) {
  return (
    <section className='movies'>
      <SearchForm 
      filterMovies={filterMovies}
      setFilterMovies={setFilterMovies}
      onSearchMovies={onSearchMovies}
      />
      <MoviesCardList
        movies={movies}
        savedMovies={savedMovies}
        filterMovies={filterMovies}
       
        onMoviesLike={onMoviesLike}
        onMoviesDelete={onMoviesDelete}
        
      />
    </section>
  );
}
