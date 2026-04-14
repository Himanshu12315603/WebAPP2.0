# FuelFlux — Smart Fuel Station Management Platform

A full-stack web application for managing petrol pumps and fuel stations, with separate admin and user-facing apps.

## Project Structure

```
WebAPP2.0/
├── FuelFlux_admin/          # Admin Panel
│   ├── Backend/             # Express + MongoDB (port 5000)
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose schemas (Admin, Booking, Employee, Nozzle, etc.)
│   │   ├── routes/          # API routes (auth, admin, user, api)
│   │   ├── scripts/         # DB seed & cleanup scripts
│   │   └── server.js        # Entry point
│   └── Frontend/            # React + Vite + Tailwind (port 5173)
│       └── src/
│           ├── api/         # API service modules
│           ├── components/  # Reusable UI (Navbar, Sidebar, Table, etc.)
│           ├── hooks/       # Custom React hooks
│           └── pages/       # Dashboard, Station, Nozzle, Employee, etc.
│
├── user/                    # User-Facing App
│   ├── Backend/             # Express + MongoDB (port 8080)
│   │   ├── config/          # DB connection & Passport config
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Mongoose schemas (User, Booking, PetrolPump, etc.)
│   │   ├── routes/          # API routes (Users, Booking, Payment, etc.)
│   │   ├── scripts/         # Debug & seed scripts
│   │   └── app.js           # Entry point
│   └── Frontend/            # React + Vite + Tailwind (port 5173)
│       └── src/
│           ├── components/  # Header, Footer, Profile
│           ├── screens/     # Login, Signup, Map, Booking, Payment, etc.
│           ├── profilescreens/ # User profile pages
│           ├── ProtectedRoute/ # Auth guards
│           ├── PrivacyPolicyRoute/ # Legal pages
│           └── Utils/       # Axios instance, Razorpay loader, geolocation
│
└── README.md
```

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS        |
| Backend  | Express.js, Node.js                 |
| Database | MongoDB (Mongoose ODM)              |
| Auth     | JWT, Passport.js, Google OAuth      |
| Payments | Razorpay                            |
| Maps     | Leaflet / Google Maps API           |

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **MongoDB** running locally on `mongodb://localhost:27017`

### 1. Admin Backend

```bash
cd FuelFlux_admin/Backend
cp .env.example .env       # Edit with your values
npm install
npm run dev                 # Starts on port 5000
```

### 2. Admin Frontend

```bash
cd FuelFlux_admin/Frontend
cp .env.example .env        # Edit with your values
npm install
npm run dev                 # Starts on port 5173
```

### 3. User Backend

```bash
cd user/Backend
cp .env.example .env        # Edit with your values
npm install
npm start                   # Starts on port 8080
```

### 4. User Frontend

```bash
cd user/Frontend
cp .env.example .env        # Edit with your values
npm install
npm run dev                 # Starts on port 5173
```

> **Note:** Run admin and user frontends on different ports if running simultaneously. Use `npx vite --port 5174` for the second one.

## Environment Variables

Each app has a `.env.example` file — copy it to `.env` and fill in your values. See the individual `.env.example` files for details.
