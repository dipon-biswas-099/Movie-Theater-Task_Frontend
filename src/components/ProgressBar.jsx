export default function ProgressBar({ watchedCount, total, unwatchedRuntimeMinutes }) {
  const pct = total > 0 ? Math.round((watchedCount / total) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-text">
        <span>📊 <strong>{watchedCount}</strong> of <strong>{total}</strong> prerequisites watched</span>
        <span>{pct}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-remaining">
        {unwatchedRuntimeMinutes > 0
          ? `⏳ ${unwatchedRuntimeMinutes} minutes of unwatched content remaining`
          : '🎉 All prerequisites watched!'}
      </div>
    </div>
  );
}
