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
  const [loadingImages, setLoadingImages] = useState({});

  const handleId = (id) => {
    setId(id);
  };

  const handleImagesLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    const initialState = newMovie.reduce((acc, el) => {
      acc[el.imdbID] = true;
      return acc;
    }, {});
    setLoadingImages(initialState);
  }, [newMovie]);

  return (
    <div>
      <InputSearch>Search for movies</InputSearch>
      <h1 className="text-white font-light text-2xl pl-5">Movies</h1>
      {newMovie.length === 0 ? (
        <Loading />
      ) : (
        <div className="systemGrid p-4">
          {newMovie.map((el, idx) => (
            <div
              key={el.imdbID}
              className="flex flex-col p-3 bg-blue-950 rounded-lg ">
              <div className="h-full flex items-center justify-center">
                {loadingImages[el.imdbID] && (
                  <div className="loaderImages w-[1/2]"></div>
                )}
                <Image
                  src={`${el.Poster}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className={`rounded-md h-full  w-full ${loadingImages[el.imdbID] ? 'hidden' : ''}`}
                  onLoad={() => handleImagesLoad(el.imdbID)}
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
                    href={`/details`}
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
