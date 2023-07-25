import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useState, useEffect } from 'react';
export default function SavedMovies({
  movies,
  savedMovies,
  search,
  setSearch,
  onSearchSavedMovies,
  onMoviesDelete,
  onToggleAndshowShortMovie
  // сортировка по длинне фильма
  //сохранить поиск
  //кнопка ещё
}) {

  return (
    <section className='savedMovies'>
      <SearchForm 
      search={search}
      setSearch={setSearch}
      onSearchSavedMovies={onSearchSavedMovies}
      onToggleAndshowShortMovie={onToggleAndshowShortMovie}

      />
      <MoviesCardList
        movies={movies}
      //  filterMovies={filterMovies}
        //onSearchMovies={onSearchMovies}
        onMoviesDelete={onMoviesDelete}
        savedMovies={savedMovies}

        // сортировка по длинне фильма
        //сохранить поиск
        //кнопка ещё
      //  isNotFound={isNotFound}
       // isSavedFilms={true}
      />
    </section>
  );
}
