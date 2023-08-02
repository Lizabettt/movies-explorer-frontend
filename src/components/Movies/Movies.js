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
  const faindMovies = localStorage.getItem('faindMovies');
  const inputValueLocal = localStorage.getItem('inputValueLocal');
  const checkboxLocal = localStorage.getItem('checkboxLocal');

  
  //изменение чекбокса
 function handleCheckboxChange () {
    if (inputValueText !== '') {
      setCheckedCheckbox(!checkedCheckbox);
      handleFilterMovies(inputValueText, !checkedCheckbox);
    }
  };
  //фильтрация
  function handleFilterMovies(inputValue, isCheckedState) {
    console.log(filteredMovies);
    localStorage.setItem('inputValueLocal', JSON.stringify(inputValue));
    localStorage.setItem('checkboxLocal', JSON.stringify(isCheckedState));

    setError(false);
    setIsLoading(true);

    setTimeout(() => {
      let newFilteredArray = [];
      // если чекбокс включен
      if (isCheckedState) {
        newFilteredArray = movies.filter((movie) => {
          return (
            (movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())) &&
            movie.duration <= 40
          );
        });
        setFilteredMovies(newFilteredArray);
        localStorage.setItem('faindMovies', JSON.stringify(newFilteredArray));
        console.log('найденные фильмы', newFilteredArray);
        console.log('нажат чекбокс?', isCheckedState);
      } else if (!isCheckedState) { 
        //если чекбокс выключен
        newFilteredArray = movies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(inputValue.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(inputValue.toLowerCase())
          );
        });

        setFilteredMovies(newFilteredArray);
        localStorage.setItem('faindMovies', JSON.stringify(newFilteredArray));
        console.log('найденные фильмы', newFilteredArray);
        console.log('нажат чекбокс?', isCheckedState);
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
    console.log('Кол-во найденых фильмов', filteredMovies.length);

    const pageContentMovies= screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;
    console.log('pageContentMovies ->', pageContentMovies);

    return filteredMovies.slice(0, pageContentMovies + nextMovies);
  }, [nextMovies, screenWidth, filteredMovies]);
  //кнопка
  const handleClickButtonMore = () => {
    console.log('screenWidth', screenWidth);
    if (screenWidth < 1280) {
      setNextMovies((prev) => prev + 2);
    } else if (screenWidth >= 1280) {
      setNextMovies((prev) => prev + 3);
    }
  };
  //ресайз ширины
  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    console.log('размер экрана', window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (faindMovies) {
      console.log(" сет найденых фильмов", JSON.parse(faindMovies));
      setFilteredMovies(JSON.parse(faindMovies));
    }
    if (checkboxLocal) {
      setCheckedCheckbox(JSON.parse(checkboxLocal));
    }
    if (inputValueLocal) {
      setInputValueText(JSON.parse(inputValueLocal));
    }
  }, [faindMovies, checkboxLocal, inputValueLocal]);


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
        <p className='movies__errorApi error'>
          Ошибка сервера. Попробуйте еще раз позже.
        </p>
      ) : isLoading ? (
        <Preloader />
      ) : error ? (
        <p className='movies__error error'> Ничего не найдено</p>
      ) : (
        <MoviesCardList
          movies={movies}
          savedMovies={savedMovies}
          onMoviesLike={onMoviesLike}
          onMoviesDelete={onMoviesDelete}
          moviesError={moviesError}
           />
      )}
      <div className='moviesCardList__btn-box'>
        {(filteredMovies.length
        //,  console.log('filteredMovies длина для кнопки', filteredMovies.length)
        ) >
        (renderMovies.length
         // , console.log('filteredMovies длина для кнопки', renderMovies.length)
          ) ? (
          <button
            className='moviesCardList__btn btn'
            onClick={handleClickButtonMore}
            type='button'
          >
            Ещё
          </button>
        ) : (
          ''
        )}
      </div>
    </section>
  );
}
