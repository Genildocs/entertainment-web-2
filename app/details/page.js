'use client';
import React, { useContext, useEffect, useState } from 'react';
import { EntertainmentContext } from '../context/EntertainmentContext';
import Image from 'next/image';
export default function Details() {
  const { id } = useContext(EntertainmentContext);
  const [details, setDetails] = useState(id);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch(`api/details?id=${id}`);
        const data = await res.json();
        console.log(data);
        setDetails(data);
      } catch (err) {
        console.error(err);
      }
    };
    getDetails();
  }, [id]);

  return (
    <div>
      <h1 className="text-white font-light text-2xl pl-5 mt-5">Details</h1>
      <div>
        {details && (
          <div>
            <h1 className="text-white font-light text-2xl pl-5">
              {details.Title}
            </h1>
            <div>
              <img src={details.Poster} alt="movie poster" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
