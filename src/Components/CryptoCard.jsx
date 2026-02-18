import { useEffect, useState } from "react";
import { getMarket, toggleCrypto, getPortfolio } from "../Services/api";
import MarketTable from "../Components/MarketTable";

export default function Market() {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchMarket();
    fetchFavorites();

    const interval = setInterval(fetchMarket, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Cargar mercado
  const fetchMarket = async () => {
    const res = await getMarket();
    setData(res.data);
  };

  // 🔹 Cargar favoritos desde backend
  const fetchFavorites = async () => {
    const res = await getPortfolio();
    const symbols = Object.keys(res.data);
    setFavorites(symbols);
  };

  // 🔹 Toggle estrella
  const handleToggle = async (coin) => {
    const res = await toggleCrypto(coin);

    if (res.data.status === "added") {
      setFavorites((prev) => [...prev, coin.symbol]);
    } else {
      setFavorites((prev) => prev.filter((s) => s !== coin.symbol));
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">
      <h2 className="text-3xl font-bold mb-6">Mercado Cripto</h2>

      <MarketTable
        data={data}
        favorites={favorites}
        onToggle={handleToggle}
      />
    </div>
  );
}
