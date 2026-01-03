const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/authMiddleware');
const PaymentDetail = require('../models/PaymentDetails');
const Razorpay = require('razorpay');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post('/create-order', isLoggedIn, async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount, // amount in the smallest currency unit
      currency: currency || "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
});

router.post('/paymentdetail', isLoggedIn, async (req, res) => {
  const { paymentid, bookingId } = req.body;
  const userid = req.user.userid;

  if (!paymentid || !userid) {
    return res.status(400).json({ error: "Missing paymentid or user" });
  }

  try {
    const saved = await PaymentDetail.create({
      payment_id: paymentid,
      userid
    });

    // Update Booking Status if bookingId is provided
    if (bookingId) {
      const Booking = require('../models/Bookings');
      await Booking.findByIdAndUpdate(bookingId, {
        status: 'confirmed',
        paymentId: paymentid
      });
    }

    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("Payment save error:", err);
    return res.status(500).json({ error: "Failed to save payment", details: err.message });
  }
});



router.get('/getpayment', isLoggedIn, async (req, res) => {
  const userid = req.user.userid;

  if (!userid) {
    return res.status(400).json({ error: "User ID not found in request" });
  }

  try {
    const response = await PaymentDetail.find({ userid });

    if (response.length === 0) {
      return res.status(404).json({ error: "No payment records found" });
    }

    res.status(200).json({
      success: true,
      paymentdetail: response
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch payment info",
      details: error.message
    });
  }
});

module.exports = router;