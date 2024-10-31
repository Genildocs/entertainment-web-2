'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { useRouter } from 'next/compat/router';
import { useSearchParams } from 'next/navigation';
import defaultImage from '@/public/no-image.jpg';
import { Suspense } from 'react';

export default function Details() {
  const router = useRouter(); //Busca um valor em uma url com base no valor que vc passar.
  const searchParams = useSearchParams();
  const [details, setDetails] = useState('');
  const [error, setError] = useState(null); // Armazena erros
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router && !router.isReady) {
      return;
    }

    const handleRouteChange = () => {
      const id = searchParams.get('id');
      return id;
    };
    <Suspense>handleRouteChange()</Suspense>;

    const getDetails = async () => {
      try {
        setError(null);
        setLoading(true); // Inicia o loading
        const res = await fetch(`api/details?id=${handleRouteChange()}`);
        if (!res.ok) {
          throw new Error('Filme não encontrado ou erro na API');
        }
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        setError(err.message); // Armazena a mensagem de erro
        console.error('Erro ao buscar filme:', err);
      } finally {
        setLoading(false); // Finaliza o loading
      }
    };
    getDetails();
  }, [router, searchParams]);

  return (
    <div className="sm:mx-5">
      <h1 className="text-white font-light text-2xl pl-5 mt-5">Details</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <Loading />
      ) : !details ? (
        <Loading />
      ) : (
        <div className="mt-5">
          {details && (
            <>
              <div>
                <h3 className="text-white font-bold text-2xl pl-5">
                  {details.Title}
                </h3>
                <div className="flex justify-start sm:justify-start pl-5 mt-5">
                  <Image
                    src={`${details.Poster !== 'N/A' ? details.Poster : defaultImage}`}
                    alt="movie poster"
                    width={300}
                    height={300}
                    className=" rounded-3xl"
                  />
                </div>
                <div className="text-white mt-5 pl-5">
                  <div className="flex  flex-col gap-5 w-[300px]">
                    <p className="bg-blue-600 px-2 py-1">
                      Year: {details.Year}
                    </p>
                    <p className="bg-blue-600 px-2 py-1">
                      Genre: {details.Genre}
                    </p>
                    <p className="bg-blue-600 px-2 py-1">
                      Rating: {details.imdbRating}
                    </p>
                  </div>
                  <div className="my-5">
                    <span className="text-2xl">Synopsis</span>
                    <p className="mt-2">{details.Plot}</p>{' '}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
