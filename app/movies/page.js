'use client';
import { useContext, useEffect, useState } from 'react';
import InputSearch from '@/components/InputSearch';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Movie from '@/public/icon-nav-movies.svg';
import Link from 'next/link';

export default function Movies() {
  const { newMovie, setNewMovie, isLoading, setId } =
    useContext(EntertainmentContext);

  return (
    <div>
      <InputSearch>Search for movies</InputSearch>
      <h1 className="headingPages">Movies</h1>
      {newMovie.length === 0 ? (
        <Loading />
      ) : (
        <div className="systemGrid ">
          {newMovie.map((el, idx) => (
            <div key={idx} className="mapPages ">
              <div className="h-full flex items-center justify-center">
                <img
                  src={`${el.Poster}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className={`rounded-md h-full  w-full `}
                />
              </div>
              <div className="flex flex-col justify-between text-white">
                <div className="mt-2 flex items-center justify-center gap-5 bg-blue-600 mb-2 p-1 rounded-md ">
                  <h2>{el.Title.replaceAll('Movie', '')}</h2>
                </div>
                <div>
                  <p className="bg-blue-600 p-1 text-center mb-2 rounded-md">
                    Type: {el.Type === 'movie' && 'Movie'}
                  </p>
                  <p className="bg-blue-600 p-1 text-center rounded-md">
                    Year: {el.Year}
                  </p>
                  <Link
                    href={`/details?${el.Title}&id=${el.imdbID}`}
                    className="block  p-1 text-center rounded-md mt-2 w-full"
                    onClick={() => handleId(el.imdbID)}>
                    + Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
