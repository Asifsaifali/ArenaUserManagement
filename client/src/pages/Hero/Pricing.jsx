import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";

const Pricing = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  const [activeCol, setActiveCol] = useState(0)
  const plans = [
    { name: "First-Time Renewal", price: "$150", desc: "Standard Fee" },
    { name: "3-Month Plan", price: "$400", desc: "Save $50" },
    { name: "6-Month Plan", price: "$750", desc: "Save $150" },
    { name: "12-Month Plan", price: "$1500", desc: "Save $300" },
  ];
  const wallets = [
    {
      name: "USDT (TRC20)",
      address: "TTwLzr3XQYJHU3RMUXHuxvaiRYryeRuDuU",
    },
    {
      name: "USDT (SOLANA)",
      address: "D9BpQDJ6eh1n9dR5SB44JW9VMDmyzFdNqKWh5ub64mTa",
    },
    {
      name: "BEP20 USDT",
      address: "0x65Fa5FDC3E5F7e0Ca8F8e187C2DB83797a68E8a8",
    },
  ];

  const [copied, setCopied] = useState("");

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);
    setTimeout(() => setCopied(""), 1500); // Reset after 1.5 seconds
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-black lg:text-5xl sm:text-5xl">
            Arena Renewal & Pricing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            As we step into a deadline and new monthly cycle, here’s a quick update
            on renewals and pricing for continued access to the Arena.
          </p>
        </motion.div>

        {/* Pricing Table */}
        <div
          className="hidden mt-16 lg:block"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <motion.table
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr>
                <th className="py-8 pr-4"></th>
                {plans.map((plan, i) => (
                  <motion.th
                    key={i}
                    onMouseEnter={() => setActiveCol(i)}
                    onMouseLeave={() => setActiveCol(activeCol)}
                    animate={{
                      scale: activeCol === i ? 1.05 : 1,
                      backgroundColor:
                        activeCol === i ? "rgba(0, 0, 0, 1)" : "rgb(255, 255, 255)",
                      color: activeCol === i ? "#fff" : "#000000ff",
                      boxShadow:
                        activeCol === i
                          ? "0px 8px 25px rgba(0,0,0,0.15)"
                          : "0px 0px 0px rgba(0,0,0,0)",
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    layout
                    className="px-4 py-8 text-center rounded-t-xl cursor-pointer"
                  >
                    <span className="text-base font-medium">{plan.name}</span>
                    <p className="mt-6 text-5xl font-bold">{plan.price}</p>
                    <p className="mt-2 text-base font-normal">
                      {plan.desc}
                    </p>
                  </motion.th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Example row */}
              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  Access to Arena
                </td>

                {plans.map((_, i) => (
                  <motion.td
                    key={i}
                    animate={{
                      backgroundColor: activeCol === i ? "rgb(17,24,39)" : "#ffffff",
                      color: activeCol === i ? "#ffffff" : "#000000",
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`px-4 py-4 text-center border-b ${activeCol === i ? "border-white/20" : "border-gray-200"
                      }`}
                    style={{ verticalAlign: "middle" }} // keeps it aligned vertically
                  >
                    ✔
                  </motion.td>
                ))}
              </tr>



              {/* Payment row */}
              <tr>
                <td className="py-4 pr-4 font-medium border-b border-gray-200">
                  Payment Addresses
                </td>
                <td colSpan="4" className="px-4 py-4 border-b border-gray-200">
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {wallets.map((wallet) => (
                      <motion.div
                        key={wallet.address}
                        className="p-3 bg-gray-50 rounded-lg shadow-sm flex items-center justify-between border border-gray-200 cursor-pointer"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div>
                          <p className="text-sm font-semibold text-gray-700">{wallet.name}</p>
                          <p className="text-xs font-mono text-gray-500">{wallet.address}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <AnimatePresence>
                            {copied === wallet.address && (
                              <motion.span
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.3 }}
                                className="text-green-500 text-xs font-medium"
                              >
                                ✅ Copied!
                              </motion.span>
                            )}
                          </AnimatePresence>

                          <motion.button
                            onClick={() => handleCopy(wallet.address)}
                            whileTap={{ scale: 0.85, rotate: -5 }}
                            className="text-blue-500 hover:text-blue-700 transition"
                            title="Copy Address"
                          >
                            📋
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </td>
              </tr>
            </tbody>
          </motion.table>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
