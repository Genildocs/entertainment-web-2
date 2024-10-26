'use client';
import React, { useState, useContext, useEffect } from 'react';
import { EntertainmentContext } from '@/app/context/EntertainmentContext';
import { IoIosSearch } from 'react-icons/io';
export default function InputSearch({ children }) {
  const { movie, serie, setNewMovie, setNewSerie } =
    useContext(EntertainmentContext);
  const [search, SetSearch] = useState('');

  const handleSearch = (e) => {
    SetSearch(e.target.value);
    if (e.target.value === '') setNewMovie([...movie]);
    if (e.target.value === '') setNewSerie([...serie]);
  };

  useEffect(() => {
    const filterSearch = async (filter) => {
      try {
        const res = await fetch(`api/filter?filter=${filter}`);
        const data = await res.json();

        if (data.Response === 'True') {
          const { Search } = data;
          const searchMovie = Search.filter((el) => {
            return el.Type === 'movie';
          }).map((el) => {
            return { ...el, isBookmarked: false, isTrending: true };
          });

          setNewMovie(searchMovie);

          const searchSerie = Search.filter((el) => {
            return el.Type === 'series';
          }).map((el) => {
            return { ...el, isBookmarked: false, isTrending: true };
          });

          setNewSerie(searchSerie);
        }
      } catch (error) {
        console.error('Erro na busca de filmes:', error);
      }
    };

    if (search !== '') {
      filterSearch(search);
    }
  }, [search, setNewMovie, setNewSerie]);

  return (
    <div className="pl-5 my-5 flex items-center gap-2 ">
      <IoIosSearch className="h-6 w-6 fill-white cursor-pointer" />
      <input
        type="text"
        placeholder={children}
        className="w-3/4 bg-transparent text-white outline-none border-b-[1px] cursor-pointer"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}
