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
              <div className="h-full ">
                <Image
                  src={`${el.Poster}`}
                  alt={el.Title}
                  width={220}
                  height={140}
                  className=" h-[350px] object-cover borderImages  w-full
                  
                
                  "
                />
              </div>
              <div className="flex  flex-col justify-between text-white">
                <div>
                  <Link
                    href={`/details?${el.Title}&id=${el.imdbID}`}
                    className="block  p-1 text-center rounded-md mt-2 w-full hover:bg-blue-600"
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
