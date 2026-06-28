require("dotenv").config();
const mongoose = require("mongoose");

const Transport = require("../src/models/Transport");

const {
  generateBus,
  generateTrain,
  generateFlight,
} = require("./transportGenerator");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");
    // console.log(Transport);
    // Remove old transport data
    await Transport.deleteMany({});
    console.log("🗑 Old transport data removed");

    const transports = [];

    // Generate 4000 buses
    for (let i = 0; i < 4000; i++){
      const bus = generateBus();

      transports.push({
        ...bus,
        duration: `${Math.floor(Math.random() * 8) + 2}h ${
          Math.floor(Math.random() * 60)
        }m`,
        class: "AC Sleeper",
        journeyDate: new Date(
          Date.now() +
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ),
        rating: Number((4 + Math.random()).toFixed(1)),
      });
    }

    // Generate 4000 trains
    for (let i = 0; i < 4000; i++) {
      const train = generateTrain();

      transports.push({
        ...train,
        operator: train.trainName,
        duration: `${Math.floor(Math.random() * 12) + 3}h ${
          Math.floor(Math.random() * 60)
        }m`,
        class: "Sleeper",
        journeyDate: new Date(
          Date.now() +
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ),
        rating: Number((4 + Math.random()).toFixed(1)),
      });

      delete transports[transports.length - 1].trainName;
      delete transports[transports.length - 1].trainNumber;
    }

    // Generate 2000 flights
    for (let i = 0; i < 2000; i++) {
      const flight = generateFlight();

      transports.push({
        ...flight,
        operator: flight.airline,
        duration: `${Math.floor(Math.random() * 3) + 1}h ${
          Math.floor(Math.random() * 60)
        }m`,
        class: "Economy",
        journeyDate: new Date(
          Date.now() +
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ),
        rating: Number((4 + Math.random()).toFixed(1)),
      });

      delete transports[transports.length - 1].airline;
      delete transports[transports.length - 1].flightNumber;
    }

    await Transport.insertMany(transports, {
          ordered: false,
        });

    console.log("🎉 Successfully inserted", transports.length, "records");

    process.exit();

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seedDatabase();