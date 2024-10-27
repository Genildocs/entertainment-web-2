'use client';
import InputSearch from '@/components/InputSearch';
import { useContext } from 'react';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/Loading';
export default function Series() {
  const { newSerie, setNewSerie, setId } = useContext(EntertainmentContext);

  return (
    <div>
      <InputSearch>Search for TV Series</InputSearch>
      <h1 className="headingPages">TV Series</h1>
      {newSerie.length === 0 ? (
        <Loading />
      ) : (
        <div className="systemGrid">
          {newSerie.map((el) => (
            <div key={el.imdbID} className="mapPages">
              <div className="h-full">
                <Image
                  src={`${el.Poster}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className="rounded-md h-full  w-full"
                />
              </div>
              <div className="flex flex-col justify-between text-white">
                <div className="mt-2 flex items-center  bg-blue-600 mb-2 p-1 ">
                  <h2 className="w-full block text-sm">{el.Title}</h2>
                </div>
                <div>
                  <p className="bg-blue-600 p-1 text-center mb-2">{el.Type}</p>
                  <p className="bg-blue-600 p-1 text-center mb-2">{el.Year}</p>
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
