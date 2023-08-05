import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

export default function SavedMovies({ savedMovies, onMoviesDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedCheckbox, setСheckedCheckbox] = useState(false);
  const [inputValueText, setInputValueText] = useState('');

  const [error, setError] = useState(false);

  //изменение чекбокса
  const handleCheckboxChange = () => {
    if (inputValueText !== '') {
      setСheckedCheckbox(!checkedCheckbox);
      handleFilterMovies(inputValueText, !checkedCheckbox);
    }
  };

  //фильтрация
  const handleFilterMovies = (inputValue, isCheckedState) => {
    let newFilteredArray = [];
    // если чекбокс включен
    if (isCheckedState) {
      newFilteredArray = savedMovies.filter((movie) => {
        return (
          (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())) &&
          movie.duration <= 40
        );
      });
      setFilteredMovies(newFilteredArray);
    } else if (!isCheckedState) {
      //если чекбокс выключен
      newFilteredArray = savedMovies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
      setFilteredMovies(newFilteredArray);
    }

    if (newFilteredArray.length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    setFilteredMovies(savedMovies);
  }, [savedMovies]);

  return (
    <section className='savedMovies'>
      <SearchForm
        onFilterMovies={handleFilterMovies}
        onCheckboxChange={handleCheckboxChange}
        checkedCheckbox={checkedCheckbox}
        setInputValueText={setInputValueText}
        inputValueText={inputValueText}
      />
      {filteredMovies.length ? (
        <MoviesCardList
          movies={filteredMovies}
          onMoviesDelete={onMoviesDelete}
        />
      ) : (
        error && <p className='savedMovies__error error'> Ничего не найдено</p>
      )}
    </section>
  );
}
