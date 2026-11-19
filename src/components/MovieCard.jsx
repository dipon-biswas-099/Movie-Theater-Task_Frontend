import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMovie, fetchMovies } from '../store/moviesSlice.js';
import PrerequisiteEditor from './PrerequisiteEditor.jsx';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);
  const [toggling, setToggling] = useState(false);

  const handleWatchedToggle = async () => {
    setToggling(true);
    await dispatch(updateMovie({ id: movie.id, data: { watched: !movie.watched } }));
    dispatch(fetchMovies());
    setToggling(false);
  };

  return (
    <div className="movie-card">
      <div className="movie-card-title">{movie.title}</div>
      <div className="movie-card-meta">
        <span>📅 {movie.releaseYear}</span>
        <span>⏱ {movie.runtimeMinutes} min</span>
      </div>
      {movie.prerequisiteIds && movie.prerequisiteIds.length > 0 && (
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          🔗 {movie.prerequisiteIds.length} prerequisite{movie.prerequisiteIds.length > 1 ? 's' : ''}
        </div>
      )}
      <div className="movie-card-actions">
        <label className="watched-label">
          <input
            type="checkbox"
            checked={movie.watched}
            onChange={handleWatchedToggle}
            disabled={toggling}
          />
          {movie.watched ? '✅ Watched' : '⬜ Unwatched'}
        </label>
        <button
          className="btn-secondary btn-sm"
          onClick={() => setShowEditor((v) => !v)}
        >
          {showEditor ? 'Close' : 'Edit Prerequisites'}
        </button>
      </div>
      {showEditor && (
        <PrerequisiteEditor movie={movie} onClose={() => setShowEditor(false)} />
      )}
    </div>
  );
}
