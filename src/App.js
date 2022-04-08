// react에서 useState와 useEffect Hook 가져오기
import React, { useState, useEffect } from 'react'

// AWS Amplify에서 API가져오기
import { API } from 'aws-amplify'

import './App.css'

function App() {
  // 빈 배열을 초깃값으로 coins 변수 생성
  const [coins, updateCoins] = useState([])

  // API 호출을 위한 fetchCoins 함수 정의
  async function fetchCoins() {
    const data = await API.get('cryptoapi', '/coins')
    updateCoins(data.coins)
  }

  // 컴포넌트가 마운트될 때 fetchCoins 함수 호출
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className='App'>
      {
        coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
        ))
      }
    </div>
  );
}

export default App