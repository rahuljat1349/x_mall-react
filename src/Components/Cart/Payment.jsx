import React, { useEffect, useRef, useState } from "react";
import CheckoutStepper from "./Stepper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const { user } = useSelector((state) => state.user || {});

  const [loading, setLoading] = useState(false);
  const payBtn = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;

    try {
      setLoading(true);

      // Construct your payment data here
      const paymentData = {
        amount: 50000, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11",
      };

      const response = await fetch("http://localhst:4000/api/v1/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      // Handle the response result as needed
      if (result.success) {
        // Payment successful
        alert("Payment successful!");
        // Redirect or perform any additional actions
        navigate("/success");
      } else {
        // Payment failed
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      // Handle and display the error message to the user
      console.error("Error confirming payment:", error.message);
      alert("There is some issue while processing payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log(shippingDetails);
  }, []);

  return (
    <>
      <div className="py-4">
        <CheckoutStepper currentStep={2} />
      </div>
      <div className="py-12 px-8 h-[80vh]">
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <button
            ref={payBtn}
            type="submit"
            disabled={loading}
            className="mt-4 disabled:bg-red-300 w-full py-2 bg-red-500 text-white rounded-md"
          >
            {loading
              ? "Processing..."
              : `Pay -₹${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </>
  );
};

export default Payment;
