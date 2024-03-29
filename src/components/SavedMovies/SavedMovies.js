import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

export default function SavedMovies({ movies, savedMovies, onMoviesDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedCheckbox, setСheckedCheckbox] = useState(false);
  const [inputValueText, setInputValueText] = useState('');

  const [error, setError] = useState(false);

  const searchedMovies = localStorage.getItem('searchedSavedMovies');
  const inputValueLocal = localStorage.getItem('inputSavedValue');
  const checkboxLocal = localStorage.getItem('checkboxStateFavorite');

  //изменение чекбокса
  const handleCheckboxChange = () => {
    if (inputValueText !== '') {
      setСheckedCheckbox(!checkedCheckbox);
      handleFilterMovies(inputValueText, !checkedCheckbox);
    }
  };

  //фильтрация
  const handleFilterMovies = (inputValue, isCheckedState) => {
    console.log(inputValue, isCheckedState);
    localStorage.setItem('inputSavedValue', JSON.stringify(inputValue));
    localStorage.setItem(
      'checkboxStateFavorite',
      JSON.stringify(isCheckedState)
    );

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
      localStorage.setItem(
        'searchedSavedMovies',
        JSON.stringify(newFilteredArray)
      );
    } else if (!isCheckedState) {
      //если чекбокс выключен
      newFilteredArray = savedMovies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
        );
      });
      setFilteredMovies(newFilteredArray);
      localStorage.setItem(
        'searchedSavedMovies',
        JSON.stringify(newFilteredArray)
      );
    }

    if (newFilteredArray.length === 0) {
      setError(true);
    }
  };

  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
    if (checkboxLocal) {
      setСheckedCheckbox(JSON.parse(checkboxLocal));
    }
    if (inputValueLocal) {
      setInputValueText(JSON.parse(inputValueLocal));
      handleFilterMovies(
        JSON.parse(inputValueLocal),
        JSON.parse(checkboxLocal)
      );
    }
     // eslint-disable-next-line
  }, [searchedMovies, checkboxLocal, inputValueLocal]);

  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    } else {
      setFilteredMovies(savedMovies);
    }
  }, [searchedMovies, savedMovies]);

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
