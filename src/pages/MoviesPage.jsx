import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/moviesSlice.js';
import MovieForm from '../components/MovieForm.jsx';
import MovieCard from '../components/MovieCard.jsx';

export default function MoviesPage() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((s) => s.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      <h1 className="page-title">🎬 Movies</h1>
      <MovieForm />
      {loading && <p className="loading-msg">Loading movies…</p>}
      {error && <div className="error-msg">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
      {!loading && movies.length === 0 && !error && (
        <p className="empty-msg">No movies yet. Add one above!</p>
      )}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
