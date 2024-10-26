'use client';
import React, { useContext, useEffect, useState } from 'react';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
import Loading from '@/components/Loading';
export default function Details() {
  const { id } = useContext(EntertainmentContext);
  const [details, setDetails] = useState('');
  const [saveId, setSaveId] = useState(id);
  const [error, setError] = useState(null); // Armazena erros
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setError(null);
        setLoading(true); // Inicia o loading
        const res = await fetch(`api/details?id=${saveId}`);
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
  }, [saveId]);

  useEffect(() => {
    setSaveId(localStorage.getItem('saveId'));
    if (saveId) {
      setDetails(saveId);
    }
  }, [saveId]);

  useEffect(() => {
    if (id) localStorage.setItem('saveId', id);
  }, [id]);

  return (
    <div>
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
            <div>
              <h3 className="text-white font-light text-2xl pl-5">
                {details.Title}
              </h3>
              <div className="flex justify-center mt-10">
                <img
                  src={`${details.Poster}`}
                  alt="movie poster"
                  className=" rounded-3xl"
                />
              </div>
              <div className="text-white">
                <p>{details.Year}</p>
                <p>{details.Genre}</p>
                <p>{details.imdbRating}</p>
                <div>
                  <span>Synopsis</span>
                  <p>{details.Plot}</p>{' '}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
