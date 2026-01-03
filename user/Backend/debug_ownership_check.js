const mongoose = require('mongoose');
// Use the local mongoose from user/Backend/node_modules

const uri = "mongodb://127.0.0.1:27017/FUELFLUX";

async function debugOwnership() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to DB");

        // 1. Identify "Agni" (The logged in Admin)
        // Note: Logging in as admin stores data in 'admins' collection
        let agni = await mongoose.connection.db.collection('admins').findOne({ email: "agni123@admin.com" });
        if (!agni) {
            console.log("CRITCAL: User agni123@admin.com NOT FOUND in 'admins' collection. Trying 'users' just in case...");
            agni = await mongoose.connection.db.collection('users').findOne({ email: "agni123@admin.com" });
        }

        if (!agni) {
            console.log("CRITCAL: User agni123@admin.com NOT FOUND in ANY collection!");
            process.exit(1);
        }

        console.log(`\n=== LOGGED IN ADMIN ===`);
        console.log(`Name: ${agni.username} | Email: ${agni.email} | ID: ${agni._id} | Collection: ${agni.role ? 'admins' : 'users'}`);

        // 2. Find Stations Owned by Agni
        const agniStations = await mongoose.connection.db.collection('petrolpumps').find({ userid: agni._id }).toArray();
        console.log(`\n=== STATIONS OWNED BY AGNI (Count: ${agniStations.length}) ===`);
        if (agniStations.length === 0) {
            console.log("Agni owns NO stations. No bookings will ever appear.");
        }
        const agniStationIds = agniStations.map(s => s._id.toString());
        agniStations.forEach(s => {
            console.log(`StationID: ${s._id} | Name: "${s.name}" | Address: ${s.address}`);
        });

        // 3. Find ALL Bookings and check if they belong to Agni
        const allBookings = await mongoose.connection.db.collection('bookings').find({}).toArray();
        console.log(`\n=== ALL BOOKINGS (Count: ${allBookings.length}) ===`);

        let matchCount = 0;
        for (const b of allBookings) {
            const isMatch = b.station && agniStationIds.includes(b.station.toString());
            if (isMatch) matchCount++;

            // Only print details if it's a match OR regarding the specific recent booking
            const isRecent = b.dateofbook && (b.dateofbook.startsWith('2025-12') || b.dateofbook.includes('Dec'));

            if (isMatch || isRecent) {
                console.log(`BookingID: ${b._id} | Date: ${b.dateofbook} | StationID: ${b.station} | Status: ${b.status}`);
                if (isMatch) console.log("   --> MATCH! THIS SHOULD BE VISIBLE.");
                else {
                    // Fetch station name for the mismatch
                    let stName = "Unknown";
                    let stOwner = "Unknown";
                    if (b.station) {
                        try {
                            const st = await mongoose.connection.db.collection('petrolpumps').findOne({ _id: new mongoose.Types.ObjectId(b.station) });
                            if (st) {
                                stName = st.name;
                                stOwner = st.userid;
                            }
                        } catch (e) { stName = "Invalid ID"; }
                    }
                    console.log(`   --> MISMATCH. Station: "${stName}" (Owner: ${stOwner})`);
                }
            }
        }

        console.log(`\n=== CONCLUSION ===`);
        console.log(`Total Bookings for Agni's Stations: ${matchCount}`);

        await mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
}

debugOwnership();
