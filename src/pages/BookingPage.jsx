import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCinemas, fetchBookingQuote } from '../store/cinemasSlice.js';
import CinemaForm from '../components/CinemaForm.jsx';
import BookingResult from '../components/BookingResult.jsx';

export default function BookingPage() {
  const dispatch = useDispatch();
  const { cinemas, loading, error, quote, quoteLoading, quoteError } = useSelector((s) => s.cinemas);
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [groupSize, setGroupSize] = useState('');

  useEffect(() => {
    dispatch(fetchCinemas());
  }, [dispatch]);

  const handleGetQuote = () => {
    if (!selectedCinemaId || !groupSize) return;
    dispatch(fetchBookingQuote({ id: selectedCinemaId, groupSize: Number(groupSize) }));
  };

  return (
    <div>
      <h1 className="page-title">🎟️ Booking</h1>
      <div className="booking-layout">
        {/* LEFT: Cinema management */}
        <div className="card">
          <div className="booking-section-title">🏟️ Cinemas</div>
          <CinemaForm />
          {loading && <p className="loading-msg">Loading…</p>}
          {error && <div className="error-msg">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
          <div className="cinemas-list">
            {cinemas.map((c) => (
              <div key={c.id} className="cinema-item">
                <div className="cinema-item-name">{c.name}</div>
                <div className="cinema-item-bundles">Bundles: {c.bundleSizes.join(', ')}</div>
              </div>
            ))}
            {cinemas.length === 0 && !loading && (
              <p className="empty-msg">No cinemas yet.</p>
            )}
          </div>
        </div>

        {/* RIGHT: Booking calculator */}
        <div className="card">
          <div className="booking-section-title">🧮 Calculator</div>
          <div className="booking-controls">
            <div className="form-group">
              <label>Cinema</label>
              <select value={selectedCinemaId} onChange={(e) => setSelectedCinemaId(e.target.value)}>
                <option value="">— Select cinema —</option>
                {cinemas.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Group Size</label>
              <input
                type="number"
                min="1"
                max="10000"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                placeholder="e.g. 7"
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleGetQuote}
              disabled={!selectedCinemaId || !groupSize}
            >
              Get Quote
            </button>
          </div>

          {quoteLoading && <p className="loading-msg">Calculating…</p>}
          {quoteError && (
            <div className="error-msg">
              {typeof quoteError === 'string' ? quoteError : JSON.stringify(quoteError)}
            </div>
          )}
          {quote && !quoteLoading && <BookingResult quote={quote} />}
        </div>
      </div>
    </div>
  );
}
