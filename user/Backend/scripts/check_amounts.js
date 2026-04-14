const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/FUELFLUX";

async function checkBookingAmounts() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB\n");

        // Get a sample of bookings to check their amount values
        const bookings = await mongoose.connection.db.collection('bookings')
            .find({})
            .limit(10)
            .toArray();

        console.log(`=== Sample of ${bookings.length} Bookings ===\n`);

        bookings.forEach((b, index) => {
            console.log(`Booking ${index + 1}:`);
            console.log(`  ID: ${b._id}`);
            console.log(`  Date: ${b.dateofbook}`);
            console.log(`  Amount: ${b.amount} (type: ${typeof b.amount})`);
            console.log(`  Fuel Type: ${b.fueltype}`);
            console.log(`  Quantity: ${b.quantity}`);
            console.log(`  Status: ${b.status}`);
            console.log('');
        });

        // Count how many have amount = 0 or undefined
        const zeroAmount = await mongoose.connection.db.collection('bookings')
            .countDocuments({ $or: [{ amount: 0 }, { amount: null }, { amount: { $exists: false } }] });

        const total = await mongoose.connection.db.collection('bookings').countDocuments({});

        console.log(`\n=== Summary ===`);
        console.log(`Total bookings: ${total}`);
        console.log(`Bookings with zero/null/missing amount: ${zeroAmount}`);
        console.log(`Bookings with valid amount: ${total - zeroAmount}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkBookingAmounts();
