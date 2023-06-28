import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

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
        <span className="searchForm__line"></span>
        <FilterCheckbox />
         </div>
    </form>
  );
}
