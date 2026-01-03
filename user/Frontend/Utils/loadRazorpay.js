// utils/loadRazorpay.js
import axiosInstance from "./axiosInstance";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const loadRazorpay = async ({ amountInPaise, user, navigate, bookingId }) => {
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    // Client-side only integration since backend secret is not available
    const options = {
      key: "rzp_test_RMYbByr1kI5Z6b", // User provided key
      amount: amountInPaise,
      currency: "INR",
      name: user?.username || "Guest",
      description: "Fuel Station Booking Payment",
      image: "https://your-logo-url.com/logo.png",
      // order_id OMITTED to allow auto-order creation for testing

      handler: async function (response) {
        const { razorpay_payment_id } = response;
        alert("Payment Successful! Payment ID: " + razorpay_payment_id);
        console.log("Payment ID:", razorpay_payment_id);

        if (navigate) {
          navigate("/mainpage");
        }

        try {
          const res = await axiosInstance.post('/api/payments/paymentdetail', {
            paymentid: razorpay_payment_id,
            bookingId: bookingId
          });
          console.log("Payment stored and booking updated:", res.data);
        } catch (error) {
          console.error("Failed to store payment:", error);
          alert("Payment success, but failed to store it: " + (error.response?.data?.message || error.message));
        }
      },
      prefill: {
        name: user?.username || "Guest",
        email: user?.email || "guest@example.com",
        contact: user?.phonenumber || "9999999999",
      },
      notes: {
        address: "Fuel Flux Corporate Office",
      },
      theme: {
        color: "#F97316",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      console.error("Payment Failed", response.error);
      alert("Payment Failed: " + response.error.description);
    });
    rzp.open();
  } catch (error) {
    console.error("Error loading Razorpay:", error);
    alert("Something went wrong while initializing payment: " + error.message);
  }
};
