# Allo Rocket — Vue.js + Spring Boot

A full-stack implementation of the Allo Bank Frontend Technical Assignment.

## Stack
- Frontend: Vue 3, Vite, Vue Router
- Backend: Java 17, Spring Boot 3, Maven, WebClient
- External data: Launch Library 2 API v2.2.0 (`lldev.thespacedevs.com`)
- Added rockets are stored in backend memory for the current running process only.

## Features
- Rocket list with image, name, and description
- Client-side name filter
- Add a local rocket (does not write to the read-only external API)
- Rocket detail route
- Loading, error/retry, empty and missing-data states
- Backend proxy for list/detail API requests
- CORS configured for the Vite development server

## Prerequisites
- Java 17+
- Maven 3.9+
- Node.js 20+ and npm

## Run backend
```bash
cd backend
mvn spring-boot:run
```
Backend defaults to `http://localhost:8080`.

## Run frontend
In a second terminal:
```bash
cd frontend
npm install
npm run dev
```
Open the URL printed by Vite (normally `http://localhost:5173`).

## API endpoints
- `GET /api/rockets` — list SpaceX rockets plus locally added rockets
- `GET /api/rockets/{id}` — one rocket by ID
- `POST /api/rockets` — add a local rocket

### Example curl
```bash
curl http://localhost:8080/api/rockets
curl http://localhost:8080/api/rockets/rocket-local-1
curl -X POST http://localhost:8080/api/rockets \
  -H 'Content-Type: application/json' \
  -d '{"name":"Demo Rocket","description":"A locally added rocket","imageUrl":"","launchCost":null,"country":"ID","firstFlight":null}'
```

## Notes
- The external API is read-only. `POST /api/rockets` adds a rocket to in-memory storage only; it disappears when the backend restarts.
- The list request uses `mode=detailed&limit=20` to request all 13 SpaceX rockets in one request.
- Missing values are shown as `Data tidak tersedia`; missing images use a placeholder.
- The external API may enforce rate limits. The backend uses the `lldev` development host specified by the assignment.
