// Quick test to verify IST date calculation
const now = new Date();
console.log('Current UTC time:', now.toISOString());
console.log('Current UTC date:', now.toISOString().split('T')[0]);

const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
const istDate = new Date(now.getTime() + istOffset);
console.log('IST time:', istDate.toISOString());
console.log('IST date:', istDate.toISOString().split('T')[0]);

// Also check local time
console.log('Local time:', now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));
