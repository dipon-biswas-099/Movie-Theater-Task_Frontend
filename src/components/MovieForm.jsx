import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMovie, fetchMovies } from '../store/moviesSlice.js';

export default function MovieForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [runtimeMinutes, setRuntimeMinutes] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await dispatch(createMovie({
        title: title.trim(),
        releaseYear: Number(releaseYear),
        runtimeMinutes: Number(runtimeMinutes),
      }));
      if (createMovie.rejected.match(result)) {
        const payload = result.payload;
        const msg = payload?.message || payload?.error || JSON.stringify(payload);
        setError(msg);
      } else {
        setTitle('');
        setReleaseYear('');
        setRuntimeMinutes('');
        dispatch(fetchMovies());
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="booking-section-title">➕ Add Movie</div>
      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Avengers: Endgame"
            required
          />
        </div>
        <div className="form-group">
          <label>Release Year</label>
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="e.g. 2019"
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Runtime (min)</label>
          <input
            type="number"
            value={runtimeMinutes}
            onChange={(e) => setRuntimeMinutes(e.target.value)}
            placeholder="e.g. 182"
            min="1"
            max="300"
            required
          />
        </div>
      </div>
      {error && <div className="error-msg">{error}</div>}
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Movie'}
      </button>
    </form>
  );
}
