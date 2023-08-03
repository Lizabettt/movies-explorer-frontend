import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  savedMovies,
  onMoviesLike,
  onMoviesDelete,
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
        </div>
      </div>
    </section>
  );
}
