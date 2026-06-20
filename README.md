# OnePass ✈️🚆🚌

OnePass is a full-stack travel booking platform that allows users to search and book buses, trains, and flights from a single interface.

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login

### Search & Booking
- Search Bus Routes
- Search Train Routes
- Search Flights
- Swap Source & Destination
- Passenger Details Collection
- Instant Booking

### Ticket Management
- View My Bookings
- Cancel Booking
- Download Ticket as PDF
- View Ticket Details
- Booking History

### Responsive UI
- Modern Glassmorphism Design
- Mobile Responsive Navbar
- Hamburger Menu for Mobile
- Toast Notifications

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- jsPDF

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

---

## Project Structure

```
Travelling/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Travelling.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

```http
POST /api/users/register
POST /api/users/login
```

### Transport

```http
GET /api/transports/search
```

### Bookings

```http
POST /api/bookings
GET /api/bookings
DELETE /api/bookings/:id
GET /api/bookings/history
```

---

## Future Enhancements

- Seat Selection
- QR Code Ticket Verification
- Razorpay Payment Integration
- User Profile Page
- Email Ticket Delivery
- Live Transport Tracking
- Admin Dashboard

---

## Author

Basudev Mondal

B.Tech Information Technology
Haldia Institute of Technology
