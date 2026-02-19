import { useState, useEffect } from "react";
import { getHistorical, getCurrentPrice } from "../Services/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CryptoChart({ symbol, range }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    fetchHistorical();
    fetchCurrent();
  }, [symbol, range]);

  const fetchCurrent = async () => {
    try {
      const price = await getCurrentPrice(symbol);
      setCurrentPrice(price);
      // Calcula change desde historical una vez cargado
    } catch (error) {
      console.error("Error fetching current price:", error);
    }
  };

  const fetchHistorical = async () => {
    try {
      setLoading(true);
      const endDate = new Date();
      const startDate = new Date(endDate.getTime() - range * 24 * 60 * 60 * 1000);
      const start = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const end = endDate.toISOString().split('T')[0];

      const response = await getHistorical(symbol, start, end);

      const formatted = response.data.map((item) => ({
        ...item,
        date: new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // e.g., "Feb 18"
        price_usd: parseFloat(item.price_usd)
      }));

      setData(formatted);

      if (formatted.length > 1) {
        const change = ((formatted[formatted.length - 1].price_usd - formatted[0].price_usd) / formatted[0].price_usd) * 100;
        setPriceChange(change);
      }
    } catch (error) {
      console.error("Historical error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="h-96 flex items-center justify-center text-gray-400">Cargando gráfico...</div>;
  }

  if (!data.length) {
    return <div className="h-96 flex items-center justify-center text-gray-500">No hay datos históricos todavía.</div>;
  }

  const isPositive = priceChange > 0;
  const color = isPositive ? "#16a34a" : "#ef4444";

  return (
    <div>
      <div className="text-2xl font-bold mb-2">
        {currentPrice ? `$${currentPrice.toLocaleString()} USD` : 'N/A'} 
        <span style={{ color }} className="ml-2 text-lg">
          {priceChange.toFixed(2)}%
        </span>
      </div>
      <div className="h-96 w-full bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-2xl">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" horizontal={true} vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={['auto', 'auto']}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${Number(value).toLocaleString('en-US', {maximumFractionDigits: 0})}`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
              }}
              formatter={(value) => `$${Number(value).toLocaleString()}`}
            />

            <Area
              type="monotone"
              dataKey="price_usd"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}