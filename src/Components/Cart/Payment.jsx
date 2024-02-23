// Payment.js
import React, { useEffect, useRef, useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import CheckoutStepper from "./Stepper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = ({ stripeApiKey }) => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const shippingDetails = JSON.parse(localStorage.getItem("shippingDetails"));
  const { user } = useSelector((state) => state.user || {});

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const payBtn = useRef(null);

  const paymentData = {
    amount: Math.round(orderInfo && orderInfo.totalPrice),
    stripeApiKey: stripeApiKey,
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    payBtn.current.disabled = true;

    try {
      setLoading(true);

      const data = await fetch("http://localhost:4000/api/v1/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          Authorization: `Bearer ${stripeApiKey}`,
        },
        body: JSON.stringify(paymentData),
      });

      const json = await data.json();
      const client_secret = json.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
        billing_details: {
          // Your billing details here
        },
      });

      if (result.error) {
        // Handle and display the error message to the user
        console.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // Payment succeeded, navigate to the success page
          navigate("/success");
        } else {
          // Payment failed, handle the scenario appropriately
          alert("There is some issue while processing payment.");
        }
      }
    } catch (error) {
      // Handle and display the error message to the user
      console.error("Error confirming payment:", error.message);
    } finally {
      setLoading(false);
      payBtn.current.disabled = false;
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
          <label className="block text-sm font-medium text-gray-700">
            Card details
            {/* <CardNumberElement></CardNumberElement> */}
            <CardElement
              className="mt-1 p-2 border border-gray-300 rounded-md"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#000",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </label>
          <button
            ref={payBtn}
            type="submit"
            disabled={!stripe || loading}
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
