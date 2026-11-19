import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCinema, fetchCinemas } from '../store/cinemasSlice.js';

export default function CinemaForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [bundleSizes, setBundleSizes] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const sizes = bundleSizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);

    if (sizes.length === 0 || sizes.some(isNaN) || sizes.some((s) => s < 1 || s > 500)) {
      setError('Bundle sizes must be comma-separated numbers between 1 and 500.');
      return;
    }

    setSubmitting(true);
    const result = await dispatch(createCinema({ name: name.trim(), bundleSizes: sizes }));
    setSubmitting(false);

    if (createCinema.rejected.match(result)) {
      const payload = result.payload;
      setError(payload?.message || JSON.stringify(payload));
    } else {
      setName('');
      setBundleSizes('');
      dispatch(fetchCinemas());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Cinema Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Vue Manchester"
          required
        />
      </div>
      <div className="form-group">
        <label>Bundle Sizes (comma-separated)</label>
        <input
          type="text"
          value={bundleSizes}
          onChange={(e) => setBundleSizes(e.target.value)}
          placeholder="e.g. 2,5,10"
          required
        />
      </div>
      {error && <div className="error-msg">{error}</div>}
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Cinema'}
      </button>
    </form>
  );
}
