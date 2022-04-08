// react에서 useState와 useEffect Hook 가져오기
import React, { useState, useEffect } from 'react'

// AWS Amplify에서 API가져오기
import { API } from 'aws-amplify'

import './App.css'

function App() {
  // 빈 배열을 초깃값으로 coins 변수 생성
  const [coins, updateCoins] = useState([])

  // limit 및 start에 대한 사용자 입력을 저장할 상태 추가
  const [input, updateInput] = useState({ limit:5, start:0 })

  // 사용자가 입력 값을 수정할 수 있도록 함수 생성
  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  // limit 및 start를 이용하도록 fetchCoins 함수 수정
  async function fetchCoins() {
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
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

      <input
        onChange={e => updateInputValues('limit', e.target.value)}
        placeholder="limit"
      />

      <input
        placeholder="start"
        onChange={e => updateInputValues('start', e.target.value)}
      />

      <button onClick={fetchCoins}>Fetch Coins</button>
    </div>
  );
}

export default App