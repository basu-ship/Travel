import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

const History = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/bookings/history", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const downloadTicket = (booking) => {
    const doc = new jsPDF();

    const data = booking.transportId || booking.flightDetails;
    doc.setFontSize(20);
    doc.text("OnePass Travel Ticket", 20, 20);

    // PDF Border
    doc.setDrawColor(255, 204, 0);
    doc.rect(10, 10, 190, 130);
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 20, 40);
    doc.text(
      `Transport: ${
        booking.transportId?.type || booking.flightDetails?.type
      }`,
      20,
      50
    );
    doc.text(
      `Route: ${data.source} to ${data.destination}`,
      20,
      60
    );
    doc.text(`Price: ₹${data.price}`, 20, 70);
    doc.text(`Status: ${booking.status}`, 20, 80);
    if (booking.flightDetails?.airline) {
      doc.text(`Airline: ${booking.flightDetails.airline}`, 20, 90);
    }
    if (data.departureTime) {
      doc.text(`Departure: ${data.departureTime}`, 20, 100);
    }
    if (data.arrivalTime) {
      doc.text(`Arrival: ${data.arrivalTime}`, 20, 110);
    }
    doc.save(`ticket-${booking._id}.pdf`);
  };
  return (
    <div
      className="
      w-full
      h-screen
      overflow-y-auto
      pt-24
      pb-10
      px-4
      flex
      flex-col
      items-center
      bg-gradient-to-br
      from-[#0b1120]
      via-[#1f1408]
      to-[#020617]
    ">
      {loading ? (
        <p className="text-gray-300 text-lg">
          Loading your History...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No history available 📜
        </p>
      ) : (
        <div className="w-full max-w-5xl grid gap-6">
          {bookings.map((booking) => {
            const data =
              booking.transportId || booking.flightDetails;
            return (
              <div
                key={booking._id}
                className="p-6 rounded-2xl backdrop-blur-xl
                bg-white/10 border border-white/20
                flex justify-between items-center
                hover:scale-[1.02] transition"
              >
                <div>
                  <h2 className="text-2xl font-bold text-white capitalize">
                    {booking.transportId?.type ||
                      booking.flightDetails?.type}
                  </h2>
                  {booking.flightDetails?.airline && (
                    <p className="text-blue-300 mt-1">
                      {booking.flightDetails.airline}
                    </p>
                  )}
                  <p className="text-gray-300 mt-2">
                    {data?.source} → {data?.destination}
                  </p>
                  <p className="text-yellow-400 font-semibold mt-2">
                    ₹{data?.price}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Status: {booking.status}
                  </p>
                </div>
                <div className="flex flex-col gap-3">
  <button
    onClick={() => setSelectedTicket(booking)}
    className="bg-blue-500 hover:bg-blue-400
    text-white px-5 py-2 rounded-xl font-semibold transition"
  >
    Show Ticket
  </button>

  <button
    onClick={() => downloadTicket(booking)}
    className="bg-yellow-500 hover:bg-yellow-400
    text-black px-5 py-2 rounded-xl font-semibold transition"
  >
    Download Ticket
  </button>
</div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-2xl p-8 w-[90%] max-w-[420px] shadow-2xl relative">

            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">
              OnePass Travel Ticket
            </h2>
            <p>
              <strong>Booking ID:</strong> {selectedTicket._id}
            </p>
            {/* Ticket Number */}
            <p>
              <strong>Ticket No:</strong>{" "}
              OTP-{selectedTicket._id.slice(-6).toUpperCase()}
            </p>
            <p>
              <strong>Transport:</strong>{" "}
              {selectedTicket.transportId?.type ||
                selectedTicket.flightDetails?.type}
            </p>
            {selectedTicket.flightDetails?.airline && (
              <p>
                <strong>Airline:</strong>{" "}
                {selectedTicket.flightDetails.airline}
              </p>
            )}
            <p>
              <strong>Route:</strong>{" "}
              {
                (
                  selectedTicket.transportId ||
                  selectedTicket.flightDetails
                )?.source
              }
              {" → "}
              {
                (
                  selectedTicket.transportId ||
                  selectedTicket.flightDetails
                )?.destination
              }
            </p>
            <p>
              <strong>Price:</strong> ₹
              {
                (
                  selectedTicket.transportId ||
                  selectedTicket.flightDetails
                )?.price
              }
            </p>
            {/* Passenger Details */}
            {selectedTicket.passengerDetails && (
              <>
                <p>
                  <strong>Passenger:</strong>{" "}
                  {selectedTicket.passengerDetails.fullName}
                </p>

                <p>
                  <strong>Age:</strong>{" "}
                  {selectedTicket.passengerDetails.age}
                </p>
                <p>
                  <strong>Gender:</strong>{" "}
                  {selectedTicket.passengerDetails.gender}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedTicket.passengerDetails.phone}
                </p>
              </>
            )}

            <p>
              <strong>Status:</strong>{" "}
              {selectedTicket.status}
            </p>

            {/* Booking Date */}
            <p>
              <strong>Booked On:</strong>{" "}
              {new Date(
                selectedTicket.createdAt
              ).toLocaleDateString()}
            </p>

            <button
              onClick={() => downloadTicket(selectedTicket)}
              className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400
              py-3 rounded-xl font-semibold"
            >
              Download PDF
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default History;