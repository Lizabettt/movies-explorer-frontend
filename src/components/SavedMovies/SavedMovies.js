import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
  movies,
  savedMovies,
 

  onMoviesDelete,

}) {

  return (
    <section className='savedMovies'>
      <SearchForm 
      

      />
      <MoviesCardList
        movies={movies}
      
        onMoviesDelete={onMoviesDelete}
        savedMovies={savedMovies}

      />
    </section>
  );
}
