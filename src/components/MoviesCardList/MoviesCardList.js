import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  onMoviesSave,
  onMoviesLike,
  onMoviesDelete,
  savedMovies,
}) {

  return (
    <section className='moviesCardList'>
      <div className='moviesCardList__box'>
        <div className='moviesCardList__items'>
          <ul className='moviesCardList__item'>
            {movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie._id}
                  movie={movie}
                  onMoviesSave={onMoviesSave}
                  onMoviesLike={onMoviesLike}
                  onMoviesDelete={onMoviesDelete}
                  savedMovies={savedMovies}
                />
              );
            })}
          </ul>
          <div className='moviesCardList__btn-box'>
            <button className='moviesCardList__btn btn'>Ещё</button>
          </div>
        </div>
      </div>
    </section>
  );
}
