import React, { useEffect, useState } from "react";
import axios from "axios";

const coins = ["bitcoin", "ethereum", "solana", "ripple", "cardano", "dogecoin"];

export default function LiveCryptoPrices() {
  const [prices, setPrices] = useState({});

  const fetchPrices = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
          ","
        )}&vs_currencies=usd`
      );
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // update every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-1 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📈 Live Crypto Prices</h2>

      <div className="max-h-80 overflow-y-auto scroll-smooth transition-all duration-500">
        <ul className="space-y-4 animate-fade-in-up">
          {coins.map((coin) => (
            <li
              key={coin}
              className="flex justify-between items-center border-b pb-2"
            >
              <span className="capitalize text-gray-800 font-medium text-lg">
                {coin}
              </span>
              <span className="text-green-600 font-mono text-lg">
                {prices[coin] ? `$${prices[coin].usd.toLocaleString()}` : "Loading..."}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
