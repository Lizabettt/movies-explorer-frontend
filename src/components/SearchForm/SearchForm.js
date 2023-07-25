import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

export default function SearchForm({
  search,
  setSearch,
  onSearchMovies,
  onToggleAndshowShortMovie,
  isShortMovie,
}) {
  return (
    <form className='searchForm' onSubmit={onSearchMovies}>
      <div className='searchForm__box'>
        <div className='searchForm__input-box'>
          <input
            className='searchForm__input'
            type='text'
            placeholder='Фильм'
            minLength='2'
            maxLength='30'
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className='searchForm__btn' type='submit'></button>
        </div>
        <span className='searchForm__line'></span>
        <FilterCheckbox
          onToggleAndshowShortMovie={onToggleAndshowShortMovie}
          isShortMovie={isShortMovie}
        />
      </div>
    </form>
  );
}
