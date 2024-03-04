import React, { useEffect, useRef, useState } from "react";
import CheckoutStepper from "./Stepper";
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const { user } = useSelector((state) => state.user || {});

  const [loading, setLoading] = useState(false);
  const payBtn = useRef(null);
  const paymentInfo = {
    amount: orderInfo && orderInfo.totalPrice*100,
    currency: "INR",
  };

  function loadScript(src) {
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
  }
  async function displayRazorpay(e) {
    e.preventDefault();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await fetch("http://localhost:4000/api/v1/payment", {
      method: "POST",
      headers: {
        "content-type":"application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(paymentInfo)
    });
   
    const data = await result.json();
    if (!data) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = data;
    console.log(data);

    const options = {
      key: "rzp_test_E5P57e4DK2Cu1X",
      amount: amount * 100,
      currency: currency,
      name: "xMall",
      description: "Test Transaction",
      image: {},
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:4000/payment/success",
          data
        );

        alert(result);
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#EF4444",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    // console.log(shippingDetails);
  }, []);

  return (
    <>
      <div className="py-4">
        <CheckoutStepper currentStep={2} />
      </div>
      <div className="py-12 px-8 h-[80vh]">
        <form onSubmit={displayRazorpay} className="mx-auto max-w-md">
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
