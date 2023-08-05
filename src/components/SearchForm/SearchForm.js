import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useEffect, useState } from 'react';

export default function SearchForm({
  onFilterMovies,
  onCheckboxChange,
  checkedCheckbox,
  setInputValueText,
  inputValueText,
  getMovies,
  isLoadingMovies
}) {
  const [inputError, setInputError] = useState('');
  const beatfilmMovies = localStorage.getItem('movies');

  function handleSubmit(evt) {
    evt.preventDefault();

    if (inputValueText) {
      if (!beatfilmMovies || JSON.parse(beatfilmMovies).length === 0) {
        getMovies();
      }

      setInputError('');
    } else if (!inputValueText) {
      setInputError('Вы ничего не ввели для поиска');
      return;
    }
    onFilterMovies(inputValueText, checkedCheckbox);
  }

  //отслеживаем input
  function handleInputChange(evt) {
    evt.preventDefault();
    setInputValueText(evt.target.value);
  }
  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit} noValidate>
        <div className="searchForm__box">
          <div className="searchForm__input-box">
            <input
              className="searchForm__input"
              type="text"
              name="search"
              placeholder="Фильм"
              minLength="2"
              maxLength="30"
              id="search"
              required
              value={inputValueText || ''}
              onChange={handleInputChange}
            />
            <button className="searchForm__btn" type="submit"></button>
          </div>
          <span className="searchForm__line"></span>
          <FilterCheckbox
            isChecked={checkedCheckbox}
            checkboxChange={onCheckboxChange}
          />
        </div>
      </form>
      <span className={'searchForm__error searchForm__error-active'}>
        {inputError}
      </span>
    </>
  );
}
