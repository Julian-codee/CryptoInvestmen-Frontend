import { useEffect, useState } from "react"
import { getPortfolio } from "../Services/api"
import MarketTable from "../Components/MarketTable";

export default function Market() {
  // Uso de estados
  const [data, setData] = useState({});

  // disparador
  useEffect(() => {
    fetchData();
  }, []);

  // llamado a la API para traer los datos del portafolio
  const fetchData = async () => {
    const response = await getPortfolio();
    setData(response.data);
  }

  return (
    <div className='p-10'>
      <h2>Mercado</h2>
      <MarketTable data={data} />
    </div>
  )
}
