import React, { useEffect, useState } from "react";
import { getMarket } from "../Services/api";
import CryptoChart from "../Components/CryptoChart";

export default function Charts() {
  const [market, setMarket] = useState([]);
  const [symbol, setSymbol] = useState("BTC");
  const [range, setRange] = useState(7); // días

  useEffect(() => {
    fetchMarket();
  }, []);

  const fetchMarket = async () => {
    try {
      const res = await getMarket();
      setMarket(res.data);
    } catch (error) {
      console.error("Error loading market:", error);
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
      
      <h2 className="text-3xl font-bold mb-6">
        {symbol} Chart
      </h2>

      <div className="flex gap-6 mb-8">

        {/* SELECT MONEDA */}
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-[#111827] border border-gray-700 px-4 py-2 rounded-xl"
        >
          {market.map((coin) => (
            <option key={coin.id} value={coin.symbol}>
              {coin.symbol} - {coin.name}
            </option>
          ))}
        </select>

        {/* SELECT RANGO */}
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
          className="bg-[#111827] border border-gray-700 px-4 py-2 rounded-xl"
        >
          <option value={1}>24 Horas</option>
          <option value={7}>7 Días</option>
          <option value={30}>30 Días</option>
          <option value={90}>90 Días</option>
        </select>

      </div>

      <CryptoChart symbol={symbol} range={range} />

    </div>
  );
}
