import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/moviesSlice.js';
import { fetchRewatchOrder } from '../store/moviesSlice.js';
import RewatchList from '../components/RewatchList.jsx';
import ProgressBar from '../components/ProgressBar.jsx';

export default function RewatchPage() {
  const dispatch = useDispatch();
  const { movies, rewatchOrder, rewatchLoading, rewatchError } = useSelector((s) => s.movies);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    if (id) dispatch(fetchRewatchOrder(id));
  };

  return (
    <div>
      <h1 className="page-title">📋 Rewatch Plan</h1>
      <div className="card rewatch-layout">
        <div className="rewatch-controls">
          <select value={selectedId} onChange={handleSelect}>
            <option value="">— Select a target movie —</option>
            {movies.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>

        {rewatchLoading && <p className="loading-msg">Loading rewatch order…</p>}
        {rewatchError && (
          <div className="error-msg">
            {typeof rewatchError === 'string' ? rewatchError : JSON.stringify(rewatchError)}
          </div>
        )}

        {rewatchOrder && !rewatchLoading && (
          <>
            <ProgressBar
              watchedCount={rewatchOrder.watchedCount}
              total={rewatchOrder.order.length}
              unwatchedRuntimeMinutes={rewatchOrder.unwatchedRuntimeMinutes}
            />
            <RewatchList order={rewatchOrder.order} />
          </>
        )}
      </div>
    </div>
  );
}
