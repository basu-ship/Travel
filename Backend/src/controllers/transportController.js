const Transport = require('../models/Transport');
const axios = require('axios');

exports.searchAllTransports = async (req, res) => {
    try {
        const { source, destination } = req.query;

        if (!source || !destination) {
            return res.status(400).json({
                message: 'Source and destination are required'
            });
        }

        // DB results (bus/train)
        const dbResults = await Transport.find({
            source: { $regex: source, $options: 'i' },
            destination: { $regex: destination, $options: 'i' }
        });

        // Airport code mapping
        const airportCodes = {
            Kolkata: "CCU",
            Delhi: "DEL",
            Mumbai: "BOM",
            Bangalore: "BLR",
            Chennai: "MAA",
            Hyderabad: "HYD"
        };

        let flightResults = [];

        const sourceCode = airportCodes[source];
        const destinationCode = airportCodes[destination];

        if (sourceCode && destinationCode) {
            const response = await axios.get(
                `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&dep_iata=${sourceCode}&arr_iata=${destinationCode}`
            );

            if (response.data.data) {
                flightResults = response.data.data.slice(0, 5).map((flight) => ({
                    type: "flight",
                    airline: flight.airline?.name || "Unknown Airline",
                    flightNumber: flight.flight?.iata || "N/A",
                    source,
                    destination,
                    departureTime: flight.departure?.scheduled || "N/A",
                    arrivalTime: flight.arrival?.scheduled || "N/A",
                    price: Math.floor(Math.random() * 4000) + 3000
                }));
            }
        }

        const allResults = [...dbResults, ...flightResults];

        res.status(200).json({
            count: allResults.length,
            transports: allResults
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};