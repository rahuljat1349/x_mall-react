import React from "react";

const ContactUs = () => {
  return (
    <div className="contact-container p-4 text-red-400 sm:px-20">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>

      <p className="text-gray-700 leading-6">
        Have questions, suggestions, or just want to say hello? We'd love to
        hear from you! Fill out the form below, and we'll get back to you as
        soon as possible.
      </p>

      <form className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 outline-none p-2 w-full duration-200 border-[1px] border-red-300 focus:border-red-500 focus:border-[1px] rounded-md"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 outline-none p-2 w-full duration-200  border-[1px] border-red-300 focus:border-red-500 focus:border-[1px] rounded-md"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-600"
          >
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 outline-none  p-2 w-full duration-200 border-[1px] border-red-300 focus:border-red-500 focus:border-[1px] rounded-md"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border-[1px] border-transparent text-base font-medium rounded-md text-white bg-red-500 duration-200 hover:bg-red-600 outline-none active:bg-red-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
