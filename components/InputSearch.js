'use client';
import React, { useState, useContext, useEffect } from 'react';
import { EntertainmentContext } from '@/app/context/EntertainmentContext';
import { IoMdSearch } from 'react-icons/io';
export default function InputSearch({ children }) {
  const { movie, serie, setNewMovie, setNewSerie } =
    useContext(EntertainmentContext);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = async () => {
    if (search === '') {
      setNewMovie([...movie]);
      setNewSerie([...serie]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`api/filter?filter=${search}`);
      const data = await res.json();

      if (data.Response === 'True') {
        const { Search } = data;
        const searchMovie = Search.filter((el) => {
          return el.Type === 'movie';
        }).map((el) => {
          return { ...el, isBookmarked: false, isTrending: true };
        });

        const searchSerie = Search.filter((el) => {
          return el.Type === 'series';
        }).map((el) => {
          return { ...el, isBookmarked: false, isTrending: true };
        });

        setNewMovie(searchMovie);
        setNewSerie(searchSerie);
      }
    } catch (error) {
      console.error('Erro na busca de filmes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Aciona a busca ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="pl-5 sm:ml-5 my-5 flex items-center gap-2 ">
      <IoMdSearch
        className="h-6 w-6 fill-white cursor-pointer"
        onClick={handleClick}
      />
      <input
        type="text"
        placeholder={children}
        className="w-3/4 bg-transparent text-white outline-none border-b-[1px] cursor-pointer"
        value={search}
        onChange={handleSearchChange}
        onKeyUp={handleKeyPress}
      />
      {isLoading && <div className="spinner ml-2"></div>}
    </div>
  );
}
