export default function MarketTable({ data, favorites, onToggle }) {
  return (
    <div className="overflow-x-auto bg-[#111827] rounded-2xl border border-gray-800 shadow-xl">
      <table className="w-full text-sm">
        <thead className="bg-[#1f2937] text-gray-400 uppercase text-xs">
          <tr>
            <th className="py-4 px-4"></th>
            <th className="py-4 px-4 text-left">Nombre</th>
            <th className="py-4 px-4 text-right">Precio</th>
            <th className="py-4 px-4 text-right">1h</th>
            <th className="py-4 px-4 text-right">24h</th>
            <th className="py-4 px-4 text-right">7d</th>
            <th className="py-4 px-4 text-right">Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => {
            const quote = coin.quote.USD;
            const isFav = favorites.includes(coin.symbol);

            return (
              <tr
                key={coin.id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >
                <td
                  className="px-4 cursor-pointer text-xl"
                  onClick={() => onToggle(coin)}
                >
                  {isFav ? "⭐" : "☆"}
                </td>

                <td className="py-4 px-4 font-medium">
                  {coin.name}
                  <span className="text-gray-500 text-xs ml-2">
                    {coin.symbol}
                  </span>
                </td>

                <td className="text-right font-mono">
                  ${quote.price.toLocaleString()}
                </td>

                <td
                  className={`text-right ${
                    quote.percent_change_1h > 0
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {quote.percent_change_1h.toFixed(2)}%
                </td>

                <td
                  className={`text-right ${
                    quote.percent_change_24h > 0
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {quote.percent_change_24h.toFixed(2)}%
                </td>

                <td
                  className={`text-right ${
                    quote.percent_change_7d > 0
                      ? "text-green-400"
                      : "text-red-500"
                  }`}
                >
                  {quote.percent_change_7d.toFixed(2)}%
                </td>

                <td className="text-right text-gray-400">
                  ${(quote.market_cap / 1e9).toFixed(2)}B
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
