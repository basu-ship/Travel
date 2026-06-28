const cities = require("./cities");
const {
  busOperators,
  trainNames,
  airlines,
} = require("./operators");

// Random number
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Pick random element
const pick = (arr) => arr[random(0, arr.length - 1)];

// Random departure time
function randomTime() {
  const hour = random(0, 23).toString().padStart(2, "0");
  const minute = pick(["00", "15", "30", "45"]);
  return `${hour}:${minute}`;
}

// Add hours to departure time
function arrivalTime(departure) {
  let [hour, minute] = departure.split(":").map(Number);

  const durationHour = random(2, 12);
  const durationMinute = pick([0, 15, 30, 45]);

  let totalMinutes =
    hour * 60 +
    minute +
    durationHour * 60 +
    durationMinute;

  totalMinutes %= 24 * 60;

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
// Generate bus, train, and flight data
function generateBus() {
  let source = pick(cities);
  let destination = pick(cities);

  while (source === destination)
    destination = pick(cities);

  const departure = randomTime();

  return {
    type: "bus",
    operator: pick(busOperators),
    source,
    destination,
    departureTime: departure,
    arrivalTime: arrivalTime(departure),
    price: random(150, 1200),
    availableSeats: random(5, 45),
  };
}

function generateTrain() {
  let source = pick(cities);
  let destination = pick(cities);

  while (source === destination)
    destination = pick(cities);

  const departure = randomTime();

  return {
    type: "train",
    trainName: pick(trainNames),
    trainNumber: `12${random(100,999)}`,
    source,
    destination,
    departureTime: departure,
    arrivalTime: arrivalTime(departure),
    price: random(80, 1800),
    availableSeats: random(30, 450),
  };
}

function generateFlight() {
  let source = pick(cities);
  let destination = pick(cities);

  while (source === destination)
    destination = pick(cities);

  const departure = randomTime();

  return {
    type: "flight",
    airline: pick(airlines),
    flightNumber: `OP${random(1000,9999)}`,
    source,
    destination,
    departureTime: departure,
    arrivalTime: arrivalTime(departure),
    price:
        Math.random() > 0.6
        ? random(1800,4000)
        : Math.random() > 0.3
        ? random(4000,7000)
        : random(7000,12000),
    availableSeats: random(20, 180),
  };
}



// function to generate transport based on type, source, and destination
function generateTransport(type, source, destination) {

    const departure = randomTime();

    if (type === "bus") {

        return {
            type: "bus",
            operator: pick(busOperators),
            source,
            destination,
            departureTime: departure,
            arrivalTime: arrivalTime(departure),
            duration: `${random(2,10)}h ${random(0,59)}m`,
            price: random(250,1200),
            class: "AC Sleeper",
            availableSeats: random(5,40),
            journeyDate: new Date(),
            rating: (4 + Math.random()).toFixed(1)
        };

    }

    if (type === "train") {

        return {
            type: "train",
            operator: pick(trainNames),
            source,
            destination,
            departureTime: departure,
            arrivalTime: arrivalTime(departure),
            duration: `${random(4,18)}h ${random(0,59)}m`,
            price: random(120,2500),
            class: "Sleeper",
            availableSeats: random(80,450),
            journeyDate: new Date(),
            rating: (4 + Math.random()).toFixed(1)
        };

    }

    return null;
}

module.exports = {
  generateBus,
  generateTrain,
  generateFlight,
  generateTransport
};