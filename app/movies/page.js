'use client';
import { useContext } from 'react';
import InputSearch from '@/components/InputSearch';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
export default function Movies() {
  const { newMovie, setNewMovie } = useContext(EntertainmentContext);

  return (
    <div>
      <InputSearch>Search for movies</InputSearch>
      <div className="systemGrid p-5">
        {newMovie.map((el) => (
          <div key={el.imdbID}>
            <div>
              <Image
                src={`${el.Poster.replace('url', '')}`}
                alt={el.Title}
                width={220}
                height={140}
                className="rounded-md object-cover h-[250px]"
              />
            </div>
            <div className="flex flex-col justify-between text-white">
              <div>
                <h2>{el.Title.replaceAll('Movie', '')}</h2>
              </div>
              <div>
                <p>{el.Type === 'movie' && 'Movie'}</p>
                <p>{el.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
