# Doomsday Ready frontend

React/Vite frontend for the Doomsday Ready API.

## Run

Start the backend on port 3000, then run:

```bash
npm install
npm run dev
```

The default API URL is `http://localhost:3000/api`. Set `VITE_API_URL` to
override it for another environment.

The app has Movies, Rewatch Plan, and Booking views. Movie prerequisites and
watched state are edited through the API; rewatch plans show ordered
prerequisites, progress, and remaining runtime; booking quotes show the
minimum exact bundle combination or an explicit not-possible result.

AI tools were used to inspect the starter project, identify edge cases, and
review the implementation. The UI and feature integration were written for
this application.
