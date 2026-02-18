import React from 'react'
import CryptoChart from '../Components/CryptoChart'

export default function Charts() {
  return (
    <div className='p-10'>
      <h2>Graficos</h2>
      <CryptoChart symbol="BTC" />
    </div>
  )
}
