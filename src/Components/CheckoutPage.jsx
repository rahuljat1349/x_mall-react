import React, { useState } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    creditCardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to the server)
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        {/* Billing Information */}
        <h3>Billing Information</h3>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        {/* ... (similar fields for last name, email, address, city, postal code) */}

        {/* Payment Information */}
        <h3>Payment Information</h3>
        <label>
          Credit Card Number:
          <input
            type="text"
            name="creditCardNumber"
            value={formData.creditCardNumber}
            onChange={handleChange}
            required
          />
        </label>
        {/* ... (similar fields for expiry date, CVV) */}

        {/* Order Summary */}
        <h3>Order Summary</h3>
        {/* Display order summary information (e.g., products, quantities, total price) */}

        {/* Submit Button */}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
