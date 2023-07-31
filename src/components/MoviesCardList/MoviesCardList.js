import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  savedMovies,
  onMoviesLike,
  onMoviesDelete, 

  filteredMovies,
  renderMovies,
  setNextMovies,
  screenWidth
}) {


//кнопка
const handleClickButtonMore = () => {
  if (screenWidth < 1280) {
    setNextMovies((prev) => prev + 2);
  } else if (screenWidth >= 1280) {
    setNextMovies((prev) => prev + 3);
  }
};
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
          <div className='moviesCardList__btn-box'>
          {filteredMovies.length 
        > renderMovies.length 
        ? (
            <button 
            className='moviesCardList__btn btn'
            onClick={handleClickButtonMore}
            type='button'
            >Ещё</button>
            ) : (
          ''
        )}
          </div>
        </div>
      </div>
    </section>
  );
}
