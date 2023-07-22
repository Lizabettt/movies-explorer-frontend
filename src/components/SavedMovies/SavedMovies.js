import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({
  movies,
  savedMovies,
  filterMovies,
  onSearchMovies,
  onMoviesDelete,
  // сортировка по длинне фильма
  //сохранить поиск
  //кнопка ещё
}) {
  return (
    <section className='savedMovies'>
      <SearchForm />
      <MoviesCardList
        movies={movies}
        filterMovies={filterMovies}
        onSearchMovies={onSearchMovies}
        onMoviesDelete={onMoviesDelete}
        savedMovies={savedMovies}
        // сортировка по длинне фильма
        //сохранить поиск
        //кнопка ещё
      />
    </section>
  );
}
