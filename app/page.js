'use client';
import React, { useContext, useEffect, useState } from 'react';
import InputSearch from '@/components/InputSearch';
import { EntertainmentContext } from './context/EntertainmentContext';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/Loading';

export default function Home() {
  const { newMovie, newSerie, setId } = useContext(EntertainmentContext);
  const [list, setList] = useState([]);
  const [loadingImages, setLoadingImages] = useState({});

  const handleId = (id) => {
    setId(id);
  };

  useEffect(() => {
    setList([...newMovie, ...newSerie]);
  }, [newMovie, newSerie]);

  const handleImagesLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() => {
    const initialState = list.reduce((acc, el) => {
      acc[el.imdbID] = true;
      return acc;
    }, {});
    setLoadingImages(initialState);
  }, []);

  return (
    <div>
      <InputSearch>Search for movies or TV series</InputSearch>
      <h1 className="text-white font-light text-2xl pl-5">
        Recommended for you
      </h1>
      {list.length === 0 ? (
        <Loading />
      ) : (
        <div className="systemGrid p-4">
          {list.map((el, idx) => (
            <div
              key={idx}
              className="flex flex-col p-3 bg-blue-950 rounded-lg ">
              <div className="h-full flex items-center justify-center">
                {loadingImages[el.imdbID] && (
                  <div className="loaderImages "></div>
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
