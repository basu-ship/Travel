const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;

  const msg = message.toLowerCase().trim();

  let response =
    "Sorry, I couldn't understand that. Please try asking about booking, cancellation, refunds, payments, history, login, trains, buses, flights, or routes.";

  // Booking
  if (
    msg.includes("book") ||
    msg.includes("booking") ||
    msg.includes("ticket")
  ) {
    response =
      "To book a ticket, go to Search, choose your route and click Book Now.";
  }

  // Cancellation
  else if (
    msg.includes("cancel") ||
    msg.includes("cancellation")
  ) {
    response =
      "Go to My Bookings and click the Cancel Booking button.";
  }

  // Refund
  else if (
    msg.includes("refund") ||
    msg.includes("money back")
  ) {
    response =
      "Refunds are usually processed within 3-5 business days.";
  }

  // Payments
  else if (
    msg.includes("payment") ||
    msg.includes("pay") ||
    msg.includes("upi") ||
    msg.includes("card")
  ) {
    response =
      "We currently support UPI, Debit Cards, and Credit Cards.";
  }

  // History
  else if (
    msg.includes("history") ||
    msg.includes("past booking") ||
    msg.includes("previous booking")
  ) {
    response =
      "You can view cancelled and completed bookings in the History section.";
  }

  // Login
  else if (
    msg.includes("login") ||
    msg.includes("sign in")
  ) {
    response =
      "Use your registered email and password to login.";
  }

  // Register
  else if (
    msg.includes("register") ||
    msg.includes("signup") ||
    msg.includes("sign up") ||
    msg.includes("create account")
  ) {
    response =
      "Go to the Register page and create your OnePass account.";
  }

  // Flights
  else if (
    msg.includes("flight") ||
    msg.includes("airplane") ||
    msg.includes("air india")
  ) {
    response =
      "You can search and book available flights from the Search page.";
  }

  // Train
  else if (
    msg.includes("train") ||
    msg.includes("rail")
  ) {
    response =
      "You can search available trains by selecting Train in the Search page.";
  }

  // Bus
  else if (
    msg.includes("bus")
  ) {
    response =
      "You can search available buses by selecting Bus in the Search page.";
  }

  // Route Search
  else if (
    msg.includes("route") ||
    msg.includes("search route")
  ) {
    response =
      "Enter source, destination and transport type to search routes.";
  }

  // Profile
  else if (
    msg.includes("profile") ||
    msg.includes("account")
  ) {
    response =
      "Profile management will be available in future updates.";
  }

  // Contact
  else if (
    msg.includes("contact") ||
    msg.includes("support") ||
    msg.includes("help")
  ) {
    response =
      "You can contact OnePass support through the Contact section.";
  }

  // Greeting
  else if (
    msg.includes("hello") ||
    msg.includes("hi") ||
    msg.includes("hey")
  ) {
    response =
      "Hello 👋 Welcome to OnePass. How can I help you today?";
  }

  // Thanks
  else if (
    msg.includes("thank") ||
    msg.includes("thanks")
  ) {
    response =
      "You're welcome 😊 Happy Travels with OnePass!";
  }

  res.json({
    response
  });
});

module.exports = router;