'use client';
import React, { useState, useContext, useEffect } from 'react';
import { EntertainmentContext } from '@/app/context/EntertainmentContext';
const chave = process.env.NEXT_PUBLIC_API_KEY;
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
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${chave}&s=${filter}`
        );
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
  }, [search, setNewMovie]);

  return (
    <div>
      <input
        type="text"
        placeholder={children}
        className="w-full bg-transparent text-white outline-none"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}
