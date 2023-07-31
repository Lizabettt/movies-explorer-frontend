import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Preloader from '../Preloader/Preloader';

export default function Movies({
  movies,
  savedMovies,
  moviesError,
  onMoviesLike,
  onMoviesDelete,
}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [checkedCheckbox, setCheckedCheckbox] = useState(false);
  const [inputValueText, setInputValueText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const [nextMovies, setNextMovies] = useState(0);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const searchedMovies = localStorage.getItem('searchedMovies');
  const inputValueLocal = localStorage.getItem('inputValueLocal');
  const checkboxLocal = localStorage.getItem('checkboxLocal');

  //ресайз ширины
  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (searchedMovies) {
      setFilteredMovies(JSON.parse(searchedMovies));
    }
    if (checkboxLocal) {
      setCheckedCheckbox(JSON.parse(checkboxLocal));
    }
    if (inputValueLocal) {
      setInputValueText(JSON.parse(inputValueLocal));
    }
  }, [searchedMovies, checkboxLocal, inputValueLocal]);

  //изменение чекбокса
  const handleCheckboxChange = () => {
    if (inputValueText !== '') {
      setCheckedCheckbox(!checkedCheckbox);
      handleFilterMovies(inputValueText, !checkedCheckbox);
    }
  };
  //фильтрация
  function handleFilterMovies(inputValue, isCheckedState) {
    // console.log(filteredMovies)
    localStorage.setItem('inputValueLocal', JSON.stringify(inputValue));
    localStorage.setItem('checkboxLocal', JSON.stringify(isCheckedState));

    setError(false);
    setIsLoading(true);

    setTimeout(() => {
      let newFilteredArray = [];
      if (isCheckedState) {
        newFilteredArray = movies.filter((movie) => {
          return (
            (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())) &&
            movie.duration <= 40
          );
        });
        setFilteredMovies(newFilteredArray);
        localStorage.setItem(
          'searchedMovies',
          JSON.stringify(newFilteredArray)
        );
      } else if (!isCheckedState) {
        newFilteredArray = movies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
          );
        });

        setFilteredMovies(newFilteredArray);
        localStorage.setItem(
          'searchedMovies',
          JSON.stringify(newFilteredArray)
        );
      }
      if (moviesError) {
        setErrorApi(true);
      } else if (!moviesError) {
        setErrorApi(false);
      }
      if (newFilteredArray.length === 0) {
        setError(true);
      }
      setIsLoading(false);
    }, 2000);
  }

  //рендер
  const renderMovies = useMemo(() => {
    const cardsCounter = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;
    return filteredMovies.slice(0, cardsCounter + nextMovies);
  }, [nextMovies, screenWidth, filteredMovies]);

  return (
    <section className='movies'>
      <SearchForm
        onFilterMovies={handleFilterMovies}
        onCheckboxChange={handleCheckboxChange}
        checkedCheckbox={checkedCheckbox}
        setInputValueText={setInputValueText}
        inputValueText={inputValueText}
      />
      {errorApi ? (
        <p className='movies__errorApi'>
          Ошибка сервера. Попробуйте еще раз позже.
        </p>
      ) : isLoading ? (
        <Preloader />
      ) : error ? (
        <p className='movies__error'> Ничего не найдено</p>
      ) : (
        <MoviesCardList
          savedMovies={savedMovies}
          onMoviesLike={onMoviesLike}
          onMoviesDelete={onMoviesDelete}
          moviesError={moviesError}
          //для кнопки
          filteredMovies={filteredMovies}
          renderMovies={renderMovies}
          setNextMovies={setNextMovies}
          screenWidth={screenWidth}
        />
      )}
    </section>
  );
}
