import React, { useEffect, useState } from 'react';

export default function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    async function TrendingDb() {
     

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
