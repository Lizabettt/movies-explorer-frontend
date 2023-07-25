import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({
  currentUser,
  movies,
 savedMovies,
 search,
  setSearch,
  onSearchMovies,
  onMoviesDelete,  
  onMoviesLike,
  onToggleAndshowShortMovie,
  isShortMovie
}) {
  return (
    <section className='movies'>
      <SearchForm 
      search={search}
      setSearch={setSearch}
      onSearchMovies={onSearchMovies}
      onToggleAndshowShortMovie={onToggleAndshowShortMovie}
      isShortMovie={isShortMovie}
      />
      <MoviesCardList
        movies={movies}
        currentUser={currentUser}
        savedMovies={savedMovies}
        onMoviesLike={onMoviesLike}
        onMoviesDelete={onMoviesDelete}
        
      />
    </section>
  );
}
