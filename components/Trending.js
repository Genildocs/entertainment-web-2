import React, { useEffect, useState } from 'react';

export default function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function TrendingDb() {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0MTI2NDI0ODRjNTVhYTM0MmUyNzFhZTU0ZmMxMiIsIm5iZiI6MTcyOTk5OTMzNi4xMjkxODgsInN1YiI6IjY1ZDZlYTlmOTk3NGVlMDE3YjA2NDA1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rhLLEsRdHqYu37fiD8r9fz7UBMQ6z_hZQ9vqJZ4d7NU',
        },
      };

      const res = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        options
      );
      const data = await res.json();
      const { results } = data;
      setTrending(results);
    }

    TrendingDb();
  }, []);

  return (
    <div className="pl-5 mt-3 mb-10 sm:mx-5 relative">
      {/* {trending.length !== 0 && (
        <div>
          {trending.map((el) => (
            <div key={el.id}>
              <span>{el.title}</span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
