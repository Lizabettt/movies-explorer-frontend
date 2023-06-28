import './MoviesCard.css';
import imageFilm from '../../images/imageFilm.png';

export default function MoviesCard() {
  //{card}
  return (
    <li className='moviesCard'>
      <div className='moviesCard__box'>
        <div className='moviesCard__info'>
          <h2 className='moviesCard__title'>33 слова о дизайне</h2>
          <p className='moviesCard__time'>1ч 47м</p>
        </div>
        <button className='moviesCard__btn'></button>
      </div>
      <img
        className='moviesCard__pic'
        src={imageFilm}
        alt='Картинка к фильму'
      />
    </li>
  );
}
