import React from 'react'

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
                <tbody>
                </tbody>
            </table>
        </div>
    )
}
