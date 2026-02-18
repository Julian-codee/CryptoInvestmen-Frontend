import React, { useEffect, useState } from 'react'
import { getPortfolio } from '../Services/api';
import CryptoCard from '../Components/CryptoCard';

export default function Portfolio() {

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getPortfolio();
    setData(response.data);
  };

  return (
    <div className="p-5 flex gap-5">
      {Object.keys(data).map((symbol) => {
        const coin = data[symbol][0];
        return <CryptoCard key={symbol} coin={coin} />;
      })}
    </div>
  )
}

