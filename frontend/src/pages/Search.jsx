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

      setResults(res.data.transports || res.data.results || []);

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
            passengerDetails
          }
        : {
            flightDetails: {
              transportType: transport.type,
              airline: transport.airline,
              flightNumber: transport.flightNumber,
              source: transport.source,
              destination: transport.destination,
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

      // Reset Modal
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
    <div
      className="w-full min-h-screen px-4 py-20 flex flex-col items-center
      bg-gradient-to-br from-[#0b1120] via-[#1f1408] to-[#020617]"
    >

      {/* 🔥 SEARCH CARD */}
      <div
        className="w-full max-w-5xl backdrop-blur-xl bg-white/10
        border border-white/20 rounded-3xl p-6 shadow-2xl"
      >

        <div className="grid md:grid-cols-5 gap-4 items-center">

          {/* FROM */}
          <input
            type="text"
            placeholder="From"
            className="col-span-2 p-3 rounded-xl bg-white/10 text-white
            placeholder-gray-300 outline-none border border-white/20"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          {/* 🔄 SWAP */}
          <button
            onClick={handleSwap}
            className="text-white text-xl hover:scale-110 transition"
          >
            ⇄
          </button>

          {/* TO */}
          <input
            type="text"
            placeholder="To"
            className="col-span-2 p-3 rounded-xl bg-white/10 text-white
            placeholder-gray-300 outline-none border border-white/20"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

        </div>

        {/* TYPE + BUTTON */}
        <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-between">

          <div className="relative w-full md:w-48">

            <select
              className="h-12 w-full px-4 rounded-xl bg-white/10 text-white
              border border-white/20 appearance-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="bus" className="text-black">Bus</option>
              <option value="train" className="text-black">Train</option>
              <option value="flight" className="text-black">Flight</option>
            </select>

            {/* Arrow */}
            <span
              className="absolute right-3 top-1/2
              -translate-y-1/2 text-white pointer-events-none"
            >
              ▼
            </span>

          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-gradient-to-r
            from-yellow-400 to-yellow-600
            text-black px-10 py-3 rounded-full
            font-semibold hover:scale-105 transition"
          >
            Search Journey
          </button>

        </div>
      </div>

      {/* 🚀 RESULTS */}
      <div className="mt-16 w-full max-w-5xl pb-24">

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-300">
            Searching best routes...
          </p>
        )}

        {/* Empty */}
        {!loading && results.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No results yet. Try searching 🚀
          </p>
        )}

        {/* Results */}
        <div className="grid gap-6 mt-6 mb-10">

          {results.map((item) => (

            <div
              key={item._id || `${item.flightNumber}-${item.departureTime}`}
              className="p-6 rounded-2xl backdrop-blur-lg
              bg-white/10 border border-white/20
              flex justify-between items-center
              hover:scale-[1.02] transition"
            >

              {/* LEFT */}
              <div>

                <h2 className="text-xl font-bold text-white capitalize">
                  {item.type || item.transportType}
                </h2>

                <p className="text-gray-300">
                  {item.source} → {item.destination}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  ⏱ Estimated travel time
                </p>

              </div>

              {/* RIGHT */}
              <div className="text-right">

                <p className="text-2xl font-bold text-yellow-400">
                  ₹{item.price}
                </p>

                <button
                  onClick={() => setSelectedTransport(item)}
                  className="bg-yellow-500 hover:bg-yellow-400
                  text-black px-5 py-2 rounded-xl
                  font-semibold transition"
                >
                  Book Now
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎫 PASSENGER MODAL */}
      {selectedTransport && (

        <div
          className="fixed inset-0 bg-black/70
          flex items-center justify-center z-50 px-4"
        >

          <div
            className="w-full max-w-md rounded-3xl
            bg-[#111827] border border-white/10
            p-8 text-white shadow-2xl"
          >

            <h2 className="text-3xl font-bold text-center mb-8">
              Passenger Details
            </h2>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-4 p-3 rounded-xl
              bg-white/10 border border-white/10 outline-none"
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
              className="w-full mb-4 p-3 rounded-xl
              bg-white/10 border border-white/10 outline-none"
              value={passengerDetails.age}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  age: e.target.value
                })
              }
            />

            {/* Gender */}
            <select
              className="w-full mb-4 p-3 rounded-xl
              bg-white/10 border border-white/10 outline-none"
              value={passengerDetails.gender}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  gender: e.target.value
                })
              }
            >
              <option value="" className="text-black">
                Select Gender
              </option>

              <option value="Male" className="text-black">
                Male
              </option>

              <option value="Female" className="text-black">
                Female
              </option>

            </select>

            {/* Phone */}
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full mb-6 p-3 rounded-xl
              bg-white/10 border border-white/10 outline-none"
              value={passengerDetails.phone}
              onChange={(e) =>
                setPassengerDetails({
                  ...passengerDetails,
                  phone: e.target.value
                })
              }
            />

            {/* Buttons */}
            <div className="flex gap-4">

              <button
                onClick={() => setSelectedTransport(null)}
                className="w-full py-3 rounded-xl
                bg-gray-600 hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleBooking(selectedTransport)}
                className="w-full py-3 rounded-xl
                bg-yellow-500 hover:bg-yellow-400
                text-black font-bold transition"
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