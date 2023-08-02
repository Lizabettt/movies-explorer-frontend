import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  savedMovies,
  onMoviesLike,
  onMoviesDelete,
  moviesError,
  // filteredMovies,
  // renderMovies,
  // setNextMovies,
  // screenWidth,
}) {
  
  
  return (
    <section className='moviesCardList'>
      <div className='moviesCardList__box'>
        <div className='moviesCardList__items'>
          <ul className='moviesCardList__item'>
            {movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie.movieId}
                  movie={movie}
                  onMoviesLike={onMoviesLike}
                  onMoviesDelete={onMoviesDelete}
                  savedMovies={savedMovies}
                />
              );
            })}
          </ul>
          {/* <div className='moviesCardList__btn-box'>
            {(filteredMovies.length,
            console.log(
              'filteredMovies длина для кнопки',
              filteredMovies.length
            )) >
            (renderMovies.length,
            console.log(
              'filteredMovies длина для кнопки',
              renderMovies.length
            )) ? (
              <button
                className='moviesCardList__btn btn'
                onClick={handleClickButtonMore}
                type='button'
              >
                Ещё
              </button>
            ) : (
              ''
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}
