import React, { useState, useEffect } from "react";
import { getHistorical } from "../Services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

export default function CryptoChart({ symbol }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistorical();
  }, [symbol]);

  const fetchHistorical = async () => {
    try {
      setLoading(true);

      const end = new Date().toISOString();
      const start = new Date(
        Date.now() - 7 * 24 * 60 * 60 * 1000
      ).toISOString();

      const response = await getHistorical(symbol, start, end);

      // Formatear timestamps
      const formatted = response.data.map((item) => ({
        ...item,
        date: new Date(item.timestamp).toLocaleDateString(),
      }));

      setData(formatted);
    } catch (error) {
      console.error("Error fetching historical:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        Cargando gráfico...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-500">
        No hay datos históricos aún.
      </div>
    );
  }

  return (
    <div className="h-80 w-full bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={["auto", "auto"]}
            tickFormatter={(value) =>
              `$${value.toLocaleString()}`
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
            formatter={(value) =>
              `$${Number(value).toLocaleString()}`
            }
          />

          <Area
            type="monotone"
            dataKey="price_usd"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorPrice)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
