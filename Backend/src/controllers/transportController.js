const Transport = require('../models/Transport');
const axios = require('axios');
const {generateTransport} = require('../../seed/transportGenerator')

exports.searchAllTransports = async (req, res) => {
    try {
        const { source, destination, type } = req.query;

        if (type === "flight" && sourceCode && destinationCode) {
            return res.status(400).json({
                message: 'Source and destination are required'
            });
        }

        // DB results (bus/train)
        const query = {
            source: { $regex: `^${source}$`, $options: "i" },
            destination: { $regex: `^${destination}$`, $options: "i" }
        };

        if (type && type !== "flight") {
             query.type = type;
            }

        let dbResults = await Transport.find(query);
        // Generate more transports if very few exist
if (
    type !== "flight" &&
    dbResults.length < 10
) {

    const newRecords = [];

    const need = 10 - dbResults.length;

    for (let i = 0; i < need; i++) {

        newRecords.push(
            generateTransport(
                type,
                source,
                destination
            )
        );

    }

    await Transport.insertMany(newRecords);

    dbResults = await Transport.find(query);

}

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