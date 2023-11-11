import { useEffect, useState } from 'react';

const KEY = '5b623c85';

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error(
              'Something went wrong with fetching movies, try again!'
            ); // when user lost connection

          const data = await res.json();
          if (data.Response === 'False') throw new Error('Movie not found'); // when query is wrong

          setMovies(data.Search);
          setError('');
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
            console.log(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      }; // fetch cleanup function
    },
    [query]
  );

  return { movies, isLoading, error };
}
