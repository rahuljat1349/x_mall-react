import React, { useEffect, useRef, useState } from "react";
import CheckoutStepper from "./Stepper";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { createOrder } from "../../Features/Orders/orderSlice";
const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cart = localStorage.getItem("cart");
  const [cartItems, setCartItems] = useState(cart ? JSON.parse(cart) : []);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const { user } = useSelector((state) => state.user || {});

  const [loading, setLoading] = useState(false);
  const payBtn = useRef(null);
  const paymentInfo = {
    amount: orderInfo && orderInfo.totalPrice * 100,
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
        "content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(paymentInfo),
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

        const result = await fetch(
          "http://localhost:4000/api/v1/payment/confirm",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
          }
        );
        const status = await result.json();
        if (status.success) {
          const orderDetails = {
            itemPrice: orderInfo.subTotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: orderInfo.totalPrice,
            orderItems: 
              cartItems.map((item) => {
                return {
                  product: item.id,
                  name: item.name,
                  price: item.price,
                  image: item.imageUrl,
                  quantity: item.quantity,
                };
              }),
            
            shippingInfo: {
              address: shippingDetails.address,
              city: shippingDetails.city,
              state: shippingDetails.state,
              country: shippingDetails.country,
              pinCode: shippingDetails.pinCode,
              phoneNo: shippingDetails.phone,
            },
            paymentInfo: {
              id: data.razorpayPaymentId,
              status: "succeed",
            },
          };
          dispatch(createOrder(orderDetails))
          navigate("/success");
        } else {
          alert("Error verifying payment");
        }
      },
      prefill: {
        name: "John Doe",
        email: "email@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "(address here)",
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
    // console.log(orderInfo);
    // console.log(cartItems);
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
