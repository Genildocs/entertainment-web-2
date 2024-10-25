'use client';
import { useState, useEffect, createContext, Children } from 'react';
const EntertainmentContext = createContext();

const EntertainmentProvider = ({ children }) => {
  const [movie, setMovies] = useState([]);
  const [serie, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [newMovie, setNewMovie] = useState([]);
  const [newSerie, setNewSerie] = useState([]);
  useEffect(() => {
    const getAll = async (type, setter) => {
      try {
        setIsLoading(true);
        const res = await fetch(`api/search?type=${type}`);
        const data = await res.json();

        const { Search } = data;
        const newData = Search.map((el, idx) => {
          return { ...el, isBookmarked: false, isTrending: true };
        });
        setter(newData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAll('series', setSeries);
    getAll('movie', setMovies);
  }, []);

  useEffect(() => {
    if (movie.length > 0 && serie.length > 0) {
      setNewMovie([...movie]);
      setNewSerie([...serie]);
    }
  }, [movie, serie]);

  return (
    <EntertainmentContext.Provider
      value={{
        serie,
        movie,
        isLoading,
        erro,
        newMovie,
        setNewMovie,
        newSerie,
        setNewSerie,
      }}>
      {children}
    </EntertainmentContext.Provider>
  );
};

export { EntertainmentContext, EntertainmentProvider };
