'use client';
import { useContext } from 'react';
import InputSearch from '@/components/InputSearch';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Movie from '@/public/icon-nav-movies.svg';
export default function Movies() {
  const { newMovie, setNewMovie, isLoading } = useContext(EntertainmentContext);

  return (
    <div>
      <InputSearch>Search for movies</InputSearch>
      <h1 className="text-white font-light text-2xl pl-5">Movies</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="systemGrid p-5">
          {newMovie.map((el) => (
            <div key={el.imdbID}>
              <div>
                <Image
                  src={`${el.Poster}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className="rounded-md object-cover h-[250px]"
                />
              </div>
              <div className="flex flex-col justify-between text-white">
                <div className="mt-2 flex items-center  bg-blue-600 mb-2 p-1 ">
                  <Image
                    src={Movie}
                    alt="icon nav-movie"
                    width={25}
                    height={25}
                  />{' '}
                  <h2>{el.Title.replaceAll('Movie', '')}</h2>
                </div>
                <div>
                  <p className="bg-blue-600 p-1 text-center mb-2">
                    Type: {el.Type === 'movie' && 'Movie'}
                  </p>
                  <p className="bg-blue-600 p-1 text-center">Year: {el.Year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
