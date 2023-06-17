import './SearchForm.css';
import tumbl from '../../images/smalltumb.svg';

export default function SearchForm() {
  return (
    <form className='searchForm'>
      <div className='searchForm__box'>
        <div className='searchForm__input-box'>
          <input
            className='searchForm__input'
            type='text'
            placeholder='Фильм'
            minLength='2'
            required
          />
          <button className='searchForm__btn' type='submit'></button>
        </div>
        <div className='searchForm__tumbl-box'>
          <img className='searchForm__tumbl' src={tumbl} />
          <p className='searchForm__shortFilms'>Короткометражки</p>
        </div>
      </div>
    </form>
  );
}
