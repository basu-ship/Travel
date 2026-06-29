require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const dotenv = require('dotenv');
const connnectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const transportRoutes = require('./routes/transportRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes')


const app = express();
// connnectDB();

app.use(cors());
app.use(express.json());

// user routes 
app.use('/api/users', userRouter);

// booking routes
app.use('/api/bookings', bookingRoutes);

// transport routes
app.use('/api/transports', transportRoutes);

// chatbot routes
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req , res) =>{
    res.send("API is running!");
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    console.log("Connected DB:", mongoose.connection.name);
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});