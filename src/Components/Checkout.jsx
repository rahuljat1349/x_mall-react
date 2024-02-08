import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepIcon from "@mui/material/StepIcon";

const CheckoutPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [upiOption, setUpiOption] = useState("");

  const steps = ["Select Product", "Enter Address", "Payment"];

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleContinue = () => {
    if (currentStep === steps.length - 1) {
      // Handle checkout logic
      console.log("Processing checkout...");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleUpiOptionChange = (e) => {
    setUpiOption(e.target.value);
  };

  return (
    <div className="max-w-md mx-auto p-6 my-6 shadow-2xl rounded-md">
      {/* Include the MUI Stepper directly with custom color */}
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel
                StepIconComponent={(props) => (
                  <CustomStepIcon {...props} isActive={index === currentStep} />
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <form>
        {currentStep === 0 && (
          <>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full px-3 outline-none py-2 border rounded-md"
                min="1"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="color"
                className="block text-gray-700 font-bold mb-2"
              >
                Color:
              </label>
              <select
                id="color"
                value={selectedColor}
                onChange={handleColorChange}
                className="w-full px-3 outline-none py-2 border rounded-md"
              >
                <option value="" disabled>
                  Select Color
                </option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
          </>
        )}

        {currentStep === 1 && (
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address:
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 outline-none py-2 border rounded-md"
              required
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-gray-700 font-bold mb-2"
            >
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full px-3 outline-none py-2 border rounded-md"
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="upi">UPI</option>
            </select>
          </div>
        )}

        {currentStep === 2 && paymentMethod === "upi" && (
          <div className="mb-4">
            <label
              htmlFor="upiOption"
              className="block text-gray-700 font-bold mb-2"
            >
              UPI Options:
            </label>
            <select
              id="upiOption"
              value={upiOption}
              onChange={handleUpiOptionChange}
              className="w-full px-3 outline-none py-2 border rounded-md"
            >
              <option value="" disabled>
                Select UPI Option
              </option>
              <option value="googlePay">Google Pay</option>
              <option value="phonePe">PhonePe</option>
              <option value="paytm">Paytm</option>
            </select>
          </div>
        )}

        <div className="mb-4 flex justify-between w-full">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={handleContinue}
            className="bg-red-500 text-white px-4 py-2 rounded-md ml-auto"
          >
            {currentStep === steps.length - 1 ? "Proceed" : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
};

const CustomStepIcon = ({ active, completed, ...props }) => {
  let color = "#BDBDBD"; // Default color

  if (active) {
    color = "#FF5350"; // Color when step is active
  } else if (completed) {
    color = "#FF5350"; // Color when step is completed
  }

  return <StepIcon {...props} sx={{ color }} />;
};

export default CheckoutPage;
