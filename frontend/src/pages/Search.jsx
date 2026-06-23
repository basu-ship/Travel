import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const typeFromURL = params.get("type");

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState(typeFromURL || "bus");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Passenger Modal States
  const [selectedTransport, setSelectedTransport] = useState(null);

  const [passengerDetails, setPassengerDetails] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: ""
  });

  // 🔄 Swap function
  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  // 🔍 Search
  const handleSearch = async () => {
    if (!source || !destination) {
      return toast.error("Enter source & destination");
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/transports/search?source=${source}&destination=${destination}&type=${type}`
      );

      setResults(res.data.transports || res.data.results || res.data || []);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  // 🎫 Booking
  const handleBooking = async (transport) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to book a journey");
        return;
      }

      // Validation
      if (
        !passengerDetails.fullName ||
        !passengerDetails.age ||
        !passengerDetails.gender ||
        !passengerDetails.phone
      ) {
        return toast.error("Please fill all passenger details");
      }

      const bookingData = transport._id
        ? {
            transportId: transport._id,
            passengerDetails,
            journeyDate: transport.journeyDate
          }
        : {
            flightDetails: {
              transportType: transport.type,
              airline: transport.airline,
              flightNumber: transport.flightNumber,
              source: transport.source,
              destination: transport.destination,
              journeyDate: transport.journeyDate,
              departureTime: transport.departureTime,
              arrivalTime: transport.arrivalTime,
              price: transport.price
            },
            passengerDetails
          };

      await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Booking successful!");

      setSelectedTransport(null);

      setPassengerDetails({
        fullName: "",
        age: "",
        gender: "",
        phone: ""
      });

      navigate("/bookings");

    } catch (error) {
      console.log(error);
      toast.error("Booking failed");
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-16 flex flex-col items-center bg-gradient-to-br from-[#0b1120] via-[#1f1408] to-[#020617] font-sans antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
      
      {/* 1. HERO SECTION */}
      <div className="w-full max-w-5xl text-center mb-10 mt-10">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          Search Your Journey
        </h1>
        <p className="text-gray-400 text-lg">
          Find buses, trains and flights for your next trip.
        </p>
      </div>

      {/* 🔥 SEARCH CARD */}
      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/[0.06] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* INPUT FIELDS CONTAINER */}
          <div className="w-full lg:flex-1 grid grid-cols-1 md:grid-cols-9 gap-3 items-center">
            {/* FROM */}
            <div className="md:col-span-4 relative group">
              <input
                type="text"
                placeholder="From"
                className="w-full p-4 rounded-2xl bg-white/[0.05] text-white placeholder-gray-400 outline-none border border-white/10 transition-all duration-300 focus:border-yellow-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-yellow-500/10"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            {/* 🔄 SWAP BUTTON */}
            <div className="md:col-span-1 flex justify-center">
              <button
                onClick={handleSwap}
                type="button"
                className="w-10 h-10 flex items-center justify-center text-yellow-500 rounded-full bg-white/[0.05] border border-white/10 hover:bg-yellow-500 hover:text-black transition-all duration-300 transform active:scale-95 hover:rotate-180"
              >
                ⇄
              </button>
            </div>

            {/* TO */}
            <div className="md:col-span-4 relative group">
              <input
                type="text"
                placeholder="To"
                className="w-full p-4 rounded-2xl bg-white/[0.05] text-white placeholder-gray-400 outline-none border border-white/10 transition-all duration-300 focus:border-yellow-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-yellow-500/10"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          {/* SELECT AND BUTTON CONTROLS */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 items-center shrink-0">
            {/* TRANSPORT TYPE SELECT */}
            <div className="relative w-full sm:w-44">
              <select
                className="h-14 w-full pl-5 pr-10 rounded-2xl bg-white/[0.05] text-white border border-white/10 appearance-none outline-none cursor-pointer transition-all duration-300 focus:border-yellow-500/50 focus:bg-white/[0.08]"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="bus" className="bg-[#0b1120] text-white">Bus</option>
                <option value="train" className="bg-[#0b1120] text-white">Train</option>
                <option value="flight" className="bg-[#0b1120] text-white">Flight</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                ▼
              </span>
            </div>

            {/* SEARCH BUTTON */}
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black px-8 h-14 rounded-2xl font-bold tracking-wide transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 "
            >
              Search Journey
            </button>
          </div>

        </div>
      </div>

      {/* 2. FEATURES */}
      <div className="w-full max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <h3 className="text-yellow-400 text-xl">🛡️</h3>
          <h4 className="text-white font-bold mt-3">Secure Booking</h4>
          <p className="text-gray-400 text-sm mt-2">Safe and reliable payment system.</p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <h3 className="text-yellow-400 text-xl">🎫</h3>
          <h4 className="text-white font-bold mt-3">Easy Booking</h4>
          <p className="text-gray-400 text-sm mt-2">Book tickets in a few clicks.</p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <h3 className="text-yellow-400 text-xl">📞</h3>
          <h4 className="text-white font-bold mt-3">24/7 Support</h4>
          <p className="text-gray-400 text-sm mt-2">We're here whenever you need help.</p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <h3 className="text-yellow-400 text-xl">💸</h3>
          <h4 className="text-white font-bold mt-3">Fast Refund</h4>
          <p className="text-gray-400 text-sm mt-2">Quick refund processing.</p>
        </div>
      </div>

      {/* 3. POPULAR ROUTES */}
      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-bold text-white mb-5">Popular Routes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setSource("Kolkata");
              setDestination("Haldia");
            }}
            className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-left hover:border-yellow-500 transition"
          >
            <h3 className="text-white font-bold">Kolkata → Haldia</h3>
            <p className="text-gray-400 text-sm">Most booked route</p>
          </button>

          <button
            onClick={() => {
              setSource("Kolkata");
              setDestination("Durgapur");
            }}
            className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 text-left hover:border-yellow-500 transition"
          >
            <h3 className="text-white font-bold">Kolkata → Durgapur</h3>
            <p className="text-gray-400 text-sm">Popular bus route</p>
          </button>
        </div>
      </div>

      {/* 🚀 RESULTS SECTION */}
      <div className="mt-12 w-full max-w-5xl pb-20">
        
        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-8 h-8 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-400 tracking-wide animate-pulse">
              Searching best routes...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && (
          <div className="text-center py-16 border border-white/[0.05] rounded-3xl bg-white/[0.02]">
            <p className="text-gray-400 font-medium">No results yet.</p>
            <p className="text-sm text-gray-500 mt-1">Fill out the details above to discover your journey 🚀</p>
          </div>
        )}

        {/* Results Cards List */}
        {!loading && results.length > 0 && (
          <div className="grid gap-4">
            {results.map((item) => (
              <div
                key={item._id || `${item.flightNumber}-${item.departureTime}`}
                className="p-6 rounded-2xl backdrop-blur-md bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5"
              >
                {/* LEFT INFO */}
                <div className="space-y-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase tracking-wider">
                    {item.type || item.transportType}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    {item.source} <span className="text-yellow-500 font-normal mx-1">→</span> {item.destination}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>⏱</span>
                    <span>Estimated travel time</span>
                  </div>
                </div>

                {/* RIGHT PRICING & ACTION */}
                <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto pt-4 sm:pt-0 border-t border-white/5 sm:border-none">
                  <div className="text-left sm:text-right mb-0 sm:mb-2">
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-medium">Fare</span>
                    <span className="text-2xl font-black text-yellow-400 tracking-tight">
                      ₹{item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedTransport(item)}
                    className="bg-white/10 hover:bg-yellow-500 text-white hover:text-black border border-white/10 hover:border-transparent px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎫 PASSENGER DETAILS MODAL */}
      {selectedTransport && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity duration-300">
          <div className="w-full max-w-md rounded-3xl bg-[#0d1527] border border-white/10 p-6 sm:p-8 text-white shadow-2xl transform transition-all duration-300 scale-100">
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black tracking-tight text-white">
                Passenger Details
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Please complete the following details to confirm your ticket
              </p>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3.5 rounded-xl bg-white/[0.05] border border-white/10 outline-none transition duration-200 focus:border-yellow-500/50 focus:bg-white/[0.08]"
                value={passengerDetails.fullName}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    fullName: e.target.value
                  })
                }
              />

              {/* Age */}
              <input
                type="number"
                placeholder="Age"
                className="w-full p-3.5 rounded-xl bg-white/[0.05] border border-white/10 outline-none transition duration-200 focus:border-yellow-500/50 focus:bg-white/[0.08]"
                value={passengerDetails.age}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    age: e.target.value
                  })
                }
              />

              {/* Gender */}
              <div className="relative">
                <select
                  className="w-full p-3.5 pr-10 rounded-xl bg-white/[0.05] border border-white/10 outline-none appearance-none cursor-pointer transition duration-200 focus:border-yellow-500/50 focus:bg-white/[0.08]"
                  value={passengerDetails.gender}
                  onChange={(e) =>
                    setPassengerDetails({
                      ...passengerDetails,
                      gender: e.target.value
                    })
                  }
                >
                  <option value="" className="bg-[#0b1120] text-gray-400">Select Gender</option>
                  <option value="Male" className="bg-[#0b1120] text-white">Male</option>
                  <option value="Female" className="bg-[#0b1120] text-white">Female</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">
                  ▼
                </span>
              </div>

              {/* Phone */}
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full p-3.5 rounded-xl bg-white/[0.05] border border-white/10 outline-none transition duration-200 focus:border-yellow-500/50 focus:bg-white/[0.08]"
                value={passengerDetails.phone}
                onChange={(e) =>
                  setPassengerDetails({
                    ...passengerDetails,
                    phone: e.target.value
                  })
                }
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setSelectedTransport(null)}
                type="button"
                className="w-full py-3.5 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 font-semibold text-sm transition duration-200 active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={() => handleBooking(selectedTransport)}
                type="button"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold text-sm shadow-lg shadow-yellow-500/10 transition duration-200 active:scale-95"
              >
                Confirm Booking
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Search;