import React, { useState } from "react";
import CryptoChart from "../Components/CryptoChart";

export default function Charts() {
  const [symbol, setSymbol] = useState("BTC");

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
      <h2 className="text-3xl font-bold mb-6">
        Gráfico de {symbol}
      </h2>

      <div className="flex gap-4 mb-6">
        {["BTC", "ETH", "SOL", "BNB"].map((coin) => (
          <button
            key={coin}
            onClick={() => setSymbol(coin)}
            className={`px-4 py-2 rounded-xl transition ${
              symbol === coin
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {coin}
          </button>
        ))}
      </div>

      <CryptoChart symbol={symbol} />
    </div>
  );
}
