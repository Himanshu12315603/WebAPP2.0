const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/FUELFLUX";

async function seedBooking() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        // Station: Lawgate Station (Owned by Agni)
        const stationId = "694984d8e60ae3d94f668e6c";
        const userId = "68ffb33f53f06e4cc428b675"; // Arbitrary user (user123)

        // Current date string for "Today" tab
        const today = new Date().toISOString().split('T')[0];

        const newBooking = {
            userid: new mongoose.Types.ObjectId(userId),
            station: new mongoose.Types.ObjectId(stationId),
            fueltype: "Petrol",
            quantity: 50,
            amount: 5000,
            dateofbook: today, // "2023-XX-XX"
            time: "10:00 AM",
            status: "pending",
            nofnozel: 1,
            vehicle: "Test Car",
            location: "Test Location",
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await mongoose.connection.db.collection('bookings').insertOne(newBooking);
        console.log(`\n✅ TEST BOOKING CREATED!`);
        console.log(`ID: ${result.insertedId}`);
        console.log(`Station: Lawgate Station (Owned by you)`);
        console.log(`Date: ${today}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

seedBooking();
