const mongoose = require('mongoose');
const uri = "mongodb://127.0.0.1:27017/FUELFLUX";

async function checkTodayBookings() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB\n");

        // Check what today's date is in IST
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(now.getTime() + istOffset);
        const todayIST = istDate.toISOString().split('T')[0];

        console.log('Current UTC:', now.toISOString());
        console.log('Current IST:', istDate.toISOString());
        console.log('Today (IST):', todayIST);
        console.log('');

        // Find all bookings from the last 3 days
        const bookings = await mongoose.connection.db.collection('bookings')
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

        console.log('=== Last 10 Bookings ===\n');
        bookings.forEach((b, i) => {
            console.log(`${i + 1}. ID: ${b._id}`);
            console.log(`   dateofbook: "${b.dateofbook}"`);
            console.log(`   createdAt: ${b.createdAt}`);
            console.log(`   Matches today (${todayIST})? ${b.dateofbook === todayIST}`);
            console.log('');
        });

        // Count bookings for specific dates
        const count23 = await mongoose.connection.db.collection('bookings').countDocuments({ dateofbook: '2025-12-23' });
        const count22 = await mongoose.connection.db.collection('bookings').countDocuments({ dateofbook: '2025-12-22' });
        const count25 = await mongoose.connection.db.collection('bookings').countDocuments({ dateofbook: '2025-12-25' });

        console.log('=== Booking Counts by Date ===');
        console.log(`2025-12-22: ${count22}`);
        console.log(`2025-12-23: ${count23}`);
        console.log(`2025-12-25: ${count25}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

checkTodayBookings();
