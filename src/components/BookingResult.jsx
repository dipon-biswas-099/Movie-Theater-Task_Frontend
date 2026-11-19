export default function BookingResult({ quote }) {
  if (!quote.possible) {
    return (
      <div className="booking-result failure">
        <div className="booking-result-title">❌ Not possible — no exact combination</div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          No combination of this cinema's bundle sizes adds up exactly to that group size.
        </p>
      </div>
    );
  }

  const breakdown = quote.breakdown || {};
  const entries = Object.entries(breakdown).filter(([, count]) => count > 0);

  return (
    <div className="booking-result success">
      <div className="booking-result-title">
        ✅ {quote.totalBundles} bundle{quote.totalBundles !== 1 ? 's' : ''} total
      </div>
      {entries.length > 0 && (
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Bundle Size</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([size, count]) => (
              <tr key={size}>
                <td>{size} seats</td>
                <td>× {count}</td>
                <td>{Number(size) * count} seats</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
