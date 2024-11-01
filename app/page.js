'use client';
import React, { useContext, useEffect, useState } from 'react';
import InputSearch from '@/components/InputSearch';
import { EntertainmentContext } from './context/EntertainmentContext';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/Loading';
import Trending from '@/components/Trending';
import defaultImage from '@/public/no-image.jpg';
export default function Home() {
  const { newMovie, newSerie, setId } = useContext(EntertainmentContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...newMovie, ...newSerie]);
  }, [newMovie, newSerie]);

  return (
    <div className="sm:mx-5">
      <InputSearch>Search for movies or TV series</InputSearch>
      <h1 className="text-white font-light text-2xl pl-5">Trending</h1>
      <Trending />
      <h1 className="text-white font-light text-2xl pl-5">
        Recommended for you
      </h1>
      {list.length === 0 ? (
        <Loading />
      ) : (
        <div className="systemGrid ">
          {list.map((el, idx) => (
            <div key={idx} className="mapPages">
              <div className="h-full flex items-center justify-center">
                <Image
                  src={`${el.Poster !== 'N/A' ? el.Poster : defaultImage}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className={`h-[350px] object-cover borderImages  w-full`}
                />
              </div>
              <div className="flex flex-col justify-between text-white">
                <div>
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
