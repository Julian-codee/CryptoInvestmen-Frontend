import React from 'react'
import { data } from 'react-router-dom'

export default function MarketTable() {
    return (
        <div className="overflow-x-auto"> {/* Contenedor para que sea responsive en móviles */}
            <table className="w-full mt-5 border-collapse text-left text-sm md:text-base">
                <thead>
                    <tr className="text-gray-500 border-b border-gray-800 uppercase text-xs tracking-wider">
                        <th className="py-3 px-4">Nombre</th>
                        <th className="py-3 px-4 text-right">Precio</th>
                        <th className="py-3 px-4 text-right">1h</th>
                        <th className="py-3 px-4 text-right">24h</th>
                        <th className="py-3 px-4 text-right">7d</th>
                        <th className="py-3 px-4 text-right">Cap</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-900'>
                    {/*Extraccion de datos de la moneda actual*/}
                    {Object.keys(data).map((symbol) => {
                        const coin = data[symbol][0];
                        const qoute = coin.qoute.USD;

                        return (
                            <tr key={symbol} className="hover:bg-gray-900/50 transition-colors">
                                <td className="py-4 px-4 font-medium text-white">
                                    {coin.name} <span className="text-gray-500 text-xs ml-1">{coin.symbol}</span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
