import React from "react";
import { AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { useState } from "react";
const Contact = () => {
  return (
    
    <section className="min-h-screen bg-gray-100  pb-20 px-4 flex flex-col items-center justify-start">
      {/* Header + Lottie Animation */}
      <div className="text-center max-w-2xl mb-10">
        <div className="w-40 mx-auto mb-4">
          <DotLottieReact
            src="https://lottie.host/31097b5c-555c-47b3-b91d-b2ca09197e46/YGZqOiu5qQ.lottie"
            loop
            autoplay
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Contact us</h2>
        <p className="text-gray-600 mt-2 text-sm">
         Empowering teams to connect with ease and clarity. Reach out to us for support, partnerships, or just to say hello — we're always here to help you grow.
        </p>
      </div>

      {/* Contact Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
        <div className="bg-white rounded-md p-6 shadow text-center">
          <div className="text-gray-700 mb-2 text-xl">📞</div>
          <p className="text-sm text-gray-700">+1-316-555-0116</p>
          <p className="text-sm text-gray-700">+1-446-526-0117</p>
        </div>
        <div className="bg-white rounded-md p-6 shadow text-center">
          <div className="text-gray-700 mb-2 text-xl">📧</div>
          <p className="text-sm text-gray-700">contact@example.com</p>
          <p className="text-sm text-gray-700">hr@example.com</p>
        </div>
        <div className="bg-white rounded-md p-6 shadow text-center">
          <div className="text-gray-700 mb-2 text-xl">📍</div>
          <p className="text-sm text-gray-700">8502 Preston Rd. Ingle, Maine</p>
          <p className="text-sm text-gray-700">98380, USA</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="bg-white rounded-lg p-8 shadow w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Send us a message
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Your name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Email address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Phone number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Company name</label>
            <input
              type="text"
              placeholder="Enter your company name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm text-gray-600">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message here..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
