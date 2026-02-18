import React from 'react'

export default function CryptoCard({ coin }) {
    const quote = coin.quote.USD;
    return (
        <div className="bg-[#111] p-5 rounded-[10px] w-75 shadow-lg text-white">
            <h3 className="text-lg font-semibold opacity-80">
                {coin.name} ({coin.symbol})
            </h3>
            <h2 className="text-2xl font-bold my-2">
                ${quote.price.toFixed(2)}
            </h2>
            <p className={`font-medium ${quote.percent_change_24h > 0 ? "text-lime-400" : "text-red-500"}`}>
                {quote.percent_change_24h.toFixed(2)}% 24h
            </p>
        </div>
    )
}
