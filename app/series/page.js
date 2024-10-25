'use client';
import InputSearch from '@/components/InputSearch';
import { useContext } from 'react';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
export default function Series() {
  const { newSerie, setNewSerie } = useContext(EntertainmentContext);

  return (
    <div>
      <InputSearch>Search for TV Series</InputSearch>
      <h1 className="text-white font-light text-2xl pl-5">TV Series</h1>
      <div className="systemGrid p-5">
        {newSerie.map((el) => (
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
              <div>
                <h2 className="w-full block">{el.Title}</h2>
              </div>
              <div>
                <p>{el.Type}</p>
                <p>{el.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
