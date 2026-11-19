import { Routes, Route, NavLink } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage.jsx';
import RewatchPage from './pages/RewatchPage.jsx';
import BookingPage from './pages/BookingPage.jsx';

export default function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">🌍 Doomsday Ready</div>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            🎬 Movies
          </NavLink>
          <NavLink to="/rewatch" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            📋 Rewatch Plan
          </NavLink>
          <NavLink to="/booking" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            🎟️ Booking
          </NavLink>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path="/rewatch" element={<RewatchPage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </main>
    </div>
  );
}
