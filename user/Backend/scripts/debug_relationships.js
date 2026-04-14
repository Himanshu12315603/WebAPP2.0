const mongoose = require('mongoose');
// Use the local mongoose from user/Backend/node_modules

const uri = "mongodb://127.0.0.1:27017/FUELFLUX";

async function debugRelationships() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        // 1. List all Users (Potential Admins)
        const users = await mongoose.connection.db.collection('users').find({}).project({ _id: 1, username: 1, email: 1, role: 1 }).toArray();
        console.log("\n--- Users (Admins/Owners) ---");
        users.forEach(u => console.log(`${u._id} | ${u.username} (${u.email}) | Role: ${u.role}`));

        // 2. List all PetrolPumps
        const pumps = await mongoose.connection.db.collection('petrolpumps').find({}).project({ _id: 1, name: 1, userid: 1 }).toArray();
        console.log("\n--- Petrol Pumps ---");
        pumps.forEach(p => console.log(`PumpID: ${p._id} | Name: ${p.name} | OwnerID: ${p.userid}`));

        // 3. List all Bookings
        const bookings = await mongoose.connection.db.collection('bookings').find({}).project({ _id: 1, station: 1, dateofbook: 1, status: 1 }).toArray();
        console.log("\n--- Bookings ---");
        bookings.forEach(b => {
            console.log(`BookingID: ${b._id} | StationID: ${b.station} | Date: ${b.dateofbook} | Status: ${b.status}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

debugRelationships();
