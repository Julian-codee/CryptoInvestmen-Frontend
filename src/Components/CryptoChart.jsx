import React, { useState, useEffect } from 'react'
import { getHistorical } from '../Services/api';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function CryptoChart({ symbol }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchHistorical();
    }, []);

    const fetchHistorical = async () => {
        const end = new Date().toISOString();
        const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

        const response = await getHistorical(symbol, start, end);
        setData(response.data);
    }
    return (
        <div className="h-75 w-full bg-[#111] p-4 rounded-xl border border-gray-800">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    {/* XAxis permanece oculto como en tu original */}
                    <XAxis dataKey="timestamp" hide />

                    {/* YAxis: Podríamos darle estilo a las etiquetas si quisiéramos con tick={{fill: '#777'}} */}
                    <YAxis
                        tick={{ fill: '#666', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                    />

                    {/* Tooltip personalizado para que combine con tu tema oscuro */}
                    <Tooltip
                        contentStyle={{ backgroundColor: '#222', border: 'none', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#ff4d4f' }}
                    />

                    <Line
                        type="monotone"
                        dataKey="price_usd"
                        stroke="#ff4d4f"
                        strokeWidth={2}
                        dot={false} // Quitamos los puntos para un look más "pro" y limpio
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
