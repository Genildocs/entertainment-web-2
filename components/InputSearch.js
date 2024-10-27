'use client';
import React, { useState, useContext, useEffect } from 'react';
import { EntertainmentContext } from '@/app/context/EntertainmentContext';
import { IoMdSearch } from 'react-icons/io';
export default function InputSearch({ children }) {
  const { movie, serie, setNewMovie, setNewSerie } =
    useContext(EntertainmentContext);
  const [search, SetSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      console.log('Debounced search:', search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const filterSearch = async (filter) => {
      setIsLoading(true);
      try {
        console.log('Iniciando busca com filtro:', filter);
        const res = await fetch(`api/filter?filter=${filter}`);
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

    if (debouncedSearch !== '') {
      filterSearch(debouncedSearch);
    } else {
      setNewMovie([...movie]);
      setNewSerie([...serie]);
    }
  }, [movie, serie, setNewMovie, setNewSerie, debouncedSearch]);

  // Atualiza o valor do campo de busca e redefine filmes e séries se o campo estiver vazio

  const handleSearch = (e) => {
    const value = e.target.value;
    SetSearch(value);
    if (value === '') {
      setNewMovie([...movie]);
      setNewSerie([...serie]);
    }
  };

  return (
    <div className="pl-5 sm:ml-5 my-5 flex items-center gap-2 ">
      <IoMdSearch className="h-6 w-6 fill-white cursor-pointer" />
      <input
        type="text"
        placeholder={children}
        className="w-3/4 bg-transparent text-white outline-none border-b-[1px] cursor-pointer"
        value={search}
        onChange={handleSearch}
      />
      {isLoading && (
        <div className="loader ml-2">
          {' '}
          {/* Placeholder for loader spinner */}
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </div>
      )}
    </div>
  );
}
