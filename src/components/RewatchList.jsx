export default function RewatchList({ order }) {
  if (!order || order.length === 0) {
    return <p className="empty-msg">No prerequisites needed — you can watch this movie directly!</p>;
  }

  return (
    <div className="rewatch-list">
      {order.map((movie, idx) => (
        <div key={movie.id} className={`rewatch-item${movie.watched ? ' watched' : ''}`}>
          <div className="rewatch-num">{idx + 1}</div>
          <div className="rewatch-info">
            <div className="rewatch-title">{movie.title}</div>
            <div className="rewatch-runtime">⏱ {movie.runtimeMinutes} min · {movie.releaseYear}</div>
          </div>
          <div className="rewatch-status">{movie.watched ? '✅' : '⬜'}</div>
        </div>
      ))}
    </div>
  );
}
