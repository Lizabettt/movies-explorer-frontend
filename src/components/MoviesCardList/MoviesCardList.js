import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({
  movies,
  savedMovies,
  onMoviesLike,
  onMoviesDelete,  
  currentUser,
}) {

  return (
    <section className='moviesCardList'>
      <div className='moviesCardList__box'>
        <div className='moviesCardList__items'>
          <ul className='moviesCardList__item'>
            {movies.map((movie) => {
              return (
                <MoviesCard
                  key={movie.movieId || movie.id}
                  movie={movie}
                  currentUser={currentUser}
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
