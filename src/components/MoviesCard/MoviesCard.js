import './MoviesCard.css';
import timeMovie from '../../utils/timeMovie';
import { useLocation } from 'react-router-dom';
import { BEATFILM_URL } from '../../utils/consts';
export default function MoviesCard({
  movie,
  savedMovies,
  onMoviesLike,
  onMoviesDelete,
}) {
  const location = useLocation();

  const isLiked = savedMovies
    ? savedMovies.some((item) => item.movieId === movie.id)
    : false;
  const saved = savedMovies
    ? savedMovies.find((item) => item.movieId === movie.id)
    : '';

  const moviesSavedButtonClassName = isLiked
    ? 'moviesCard__btn moviesCard__btn-moviesSaved'
    : 'moviesCard__btn moviesCard__btn-moviesNotSaved';

  const moviesCardPic = movie.image.url
    ? `${BEATFILM_URL}${movie.image.url}`
    : movie.image;

  return (
    <li className='moviesCard'>
      <div className='moviesCard__box'>
        <div className='moviesCard__info'>
          <h2 className='moviesCard__title'>{movie.nameRU}</h2>
          <p className='moviesCard__time'>{timeMovie(movie.duration)}</p>
        </div>
        {location.pathname === '/movies' ? (
          <button
            className={moviesSavedButtonClassName}
            onClick={() => onMoviesLike(movie, isLiked, saved?._id)}
          ></button>
        ) : (
          <button
            className='moviesCard__btn moviesCard__btn-delete'
            onClick={() => onMoviesDelete(movie._id)}
          ></button>
        )}
      </div>
      <a
        className='moviesCard__trailerLink'
        href={movie.trailerLink}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='moviesCard__pic'
          src={moviesCardPic}
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}
