# 🚀 OnePass - Smart Travel Booking Platform

OnePass is a modern full-stack travel booking platform that enables users to search, compare, and book **Buses, Trains, and Flights** from a single interface. The application provides a seamless booking experience with secure authentication, profile management, booking history, PDF ticket generation, and an intuitive responsive UI.

---

# ✨ Features

## 🔐 Authentication

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes
* Persistent Login

---

## 👤 User Profile

* View Profile
* Update Name & Phone Number
* Upload Profile Picture
* Cloudinary Image Storage

---

## 🔍 Smart Search

* Search Bus Routes
* Search Train Routes
* Search Flights (AviationStack API)
* Dynamic Route Generation
* Swap Source & Destination
* Search Result Sorting

  * Price (Low → High)
  * Price (High → Low)
  * Rating
  * Departure Time
  * Duration

---

## 🎫 Booking System

* Passenger Details Collection
* Instant Ticket Booking
* Secure Booking Flow
* Booking Confirmation

---

## 📄 Ticket Management

* View My Bookings
* Booking History
* Cancel Booking
* Download Ticket as PDF
* Ticket Details

---

## 🚍 Transport Management

* Dynamic Transport Generator
* Seed Database with 10,000+ Records
* Bus
* Train
* Flight Integration

---

## 🎨 User Interface

* Modern Glassmorphism UI
* Responsive Design
* Mobile Navigation Drawer
* Toast Notifications
* Animated Search Interface

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* React Hot Toast
* jsPDF

---

## Backend

* Node.js
* Express.js
* JWT
* bcryptjs
* Multer
* Cloudinary

---

## Database

* MongoDB
* Mongoose

---

## APIs

* AviationStack Flight API
* Cloudinary Image Upload API

---

# 📁 Project Structure

```text
Travelling/
│
├── Frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── seed/
│   │   ├── cities.js
│   │   ├── operators.js
│   │   ├── transportGenerator.js
│   │   └── seedDatabase.js
│   │
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Travelling.git
```

---

## Install Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## Install Backend

```bash
cd Backend
npm install
npm run dev
```

---

# 🌱 Seed Database

After setting up MongoDB, generate transport records using:

```bash
node seed/seedDatabase.js
```

This script automatically creates **10,000+ transport records** for buses, trains, and flights.

---

# 🔑 Environment Variables

Create a `.env` file inside **Backend/**

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

AVIATIONSTACK_API_KEY=your_api_key
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/users/register
POST /api/users/login
```

---

## User

```http
POST /api/users/upload-profile
PUT  /api/users/profile
```

---

## Transport

```http
GET /api/transports/search
```

---

## Bookings

```http
POST   /api/bookings
GET    /api/bookings
DELETE /api/bookings/:id
GET    /api/bookings/history
```

---

# 🚀 Upcoming Features

* Razorpay Payment Gateway
* Email Ticket Confirmation
* Live Seat Availability
* Admin Dashboard
* AI Travel Assistant
* Live Transport Tracking

---

# 👨‍💻 Author

**Basudev Mondal**

B.Tech in Information Technology

Haldia Institute of Technology

---

⭐ If you like this project, consider giving it a star on GitHub!
