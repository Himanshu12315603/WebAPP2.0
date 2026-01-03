const mongoose = require('mongoose');
// Use the local mongoose from user/Backend/node_modules

const uri = "mongodb://127.0.0.1:27017/FUELFLUX"; // Using 127.0.0.1 for consistency

async function listCollections() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        // Check bookings
        const bookingsCount = await mongoose.connection.db.collection('bookings').countDocuments();
        console.log(`Count in 'bookings': ${bookingsCount}`);

        const bookingssCount = await mongoose.connection.db.collection('bookingss').countDocuments();
        if (bookingssCount > 0) {
            console.log(`Count in 'bookingss': ${bookingssCount}`);
        } else {
            console.log("'bookingss' collection does not exist or is empty.");
        }

        // List all just in case
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("All Collections:");
        collections.forEach(c => console.log(" - " + c.name));

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

listCollections();
