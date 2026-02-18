import React, { use } from 'react'
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
    }
    return (
        <div>

        </div>
    )
}
