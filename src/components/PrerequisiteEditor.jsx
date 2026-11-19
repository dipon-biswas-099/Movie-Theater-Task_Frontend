import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovie, fetchMovies } from '../store/moviesSlice.js';

export default function PrerequisiteEditor({ movie, onClose }) {
  const dispatch = useDispatch();
  const { movies } = useSelector((s) => s.movies);
  const otherMovies = movies.filter((m) => m.id !== movie.id);

  const [selected, setSelected] = useState(new Set(movie.prerequisiteIds || []));
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    const result = await dispatch(updateMovie({
      id: movie.id,
      data: { prerequisiteIds: [...selected] },
    }));
    setSaving(false);
    if (updateMovie.rejected.match(result)) {
      const payload = result.payload;
      const code = payload?.error || payload?.code;
      if (code === 'CIRCULAR_DEPENDENCY' || (payload?.message || '').includes('CIRCULAR')) {
        setError('❌ Circular dependency detected! This would create a loop.');
      } else {
        setError(payload?.message || JSON.stringify(payload));
      }
    } else {
      dispatch(fetchMovies());
      onClose();
    }
  };

  return (
    <div className="prereq-editor">
      <div className="prereq-editor-title">Prerequisites for "{movie.title}"</div>
      {otherMovies.length === 0 ? (
        <p className="empty-msg">No other movies to select.</p>
      ) : (
        <div className="prereq-list">
          {otherMovies.map((m) => (
            <label key={m.id} className="prereq-item">
              <input
                type="checkbox"
                checked={selected.has(m.id)}
                onChange={() => toggle(m.id)}
              />
              {m.title} ({m.releaseYear})
            </label>
          ))}
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn-primary btn-sm" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button className="btn-secondary btn-sm" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
