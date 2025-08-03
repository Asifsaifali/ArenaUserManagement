import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-10 bg-gray-50 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
          <div
            className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8"
            data-aos="fade-up"
          >
            <img
              className="w-auto h-9"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
              alt="The Arena Logo"
            />

            <p className="text-base leading-relaxed text-gray-600 mt-7">
              The Arena is a vibrant trading community built for learners, investors,
              and professionals to stay informed, grow together, and thrive in
              dynamic markets.
            </p>

            <ul className="flex items-center space-x-3 mt-9">
              {[...Array(4)].map((_, i) => (
                <li key={i}>
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600"
                  >
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Company
            </p>

            <ul className="mt-6 space-y-4">
              {['About', 'Features', 'Works', 'Career'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    title=""
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Help
            </p>

            <ul className="mt-6 space-y-4">
              {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    title=""
                    className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
              Subscribe to newsletter
            </p>

            <form action="#" method="POST" className="mt-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-200" data-aos="fade-up" />

        <p
          className="text-sm text-center text-gray-600"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          © {new Date().getFullYear()} The Arena Team. All Rights Reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
