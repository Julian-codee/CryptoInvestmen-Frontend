import { useEffect, useState } from "react";
import { getPortfolio } from "../Services/api";

export default function Portfolio() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getPortfolio();
    setData(res.data);
  };

  const coins = Object.keys(data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] p-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Mi Portafolio</h2>

      {coins.length === 0 ? (
        <p className="text-gray-400">No tienes monedas seleccionadas.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {coins.map((symbol) => {
            const coin = data[symbol][0];
            const quote = coin.quote.USD;

            return (
              <div
                key={symbol}
                className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-lg hover:scale-105 transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">
                    {coin.name}
                    <span className="text-gray-400 text-sm ml-2">
                      {coin.symbol}
                    </span>
                  </h3>
                  <span className="text-yellow-400 text-xl">⭐</span>
                </div>

                <p className="text-2xl font-mono mb-2">
                  ${quote.price.toLocaleString()}
                </p>

                <div className="text-sm text-gray-400 space-y-1">
                  <p>
                    24h:{" "}
                    <span
                      className={
                        quote.percent_change_24h > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }
                    >
                      {quote.percent_change_24h.toFixed(2)}%
                    </span>
                  </p>
                  <p>
                    7d:{" "}
                    <span
                      className={
                        quote.percent_change_7d > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }
                    >
                      {quote.percent_change_7d.toFixed(2)}%
                    </span>
                  </p>
                  <p>
                    Market Cap: ${(quote.market_cap / 1e9).toFixed(2)}B
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
