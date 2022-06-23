import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components';

const TokenTable: React.FC = () => {
  const [category, setCategory] = useState("ethereum-ecosystem");
  const [coins, setCoins] = useState<any>([]);
  const [page, setPage] = useState(1);

  const getCoins = useCallback(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=${category}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`).then(data => {
      setCoins(data.data.map((item: any) => (
        {
          name: item.name,
          symbol: item.symbol,
          price: item.current_price,
          image: item.image
        }
      )))
    });
  }, [category, page]);

  useEffect(() => {
    getCoins();
  }, [category, page])

  return (
    <Container>
      <div>
        <select onChange={(e: any) => setCategory(e.target.selectedOptions[0].value)}>
          <option id='1' value="ethereum-ecosystem">Ethereum</option>
          <option id='2' value="binance-smart-chain">Binance</option>
          <option id='3' value="polygon-ecosystem">Polygon</option>
        </select>
        <input type='number' value={page} onChange={(e: any) => setPage(parseInt(e.target.value))}></input>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Coin</td>
              <td>Symbol</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin: any, i: any) => (
              <tr key={i}>
                <td><img src={coin.image}></img>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{coin.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}

const Container = styled.div`
  table {
    margin: 0 auto;
    margin-top: 30px;
    width: 80%;
    border: 1px solid #ccc;
    thead {
      font-weight: bold;
      border-bottom: 1px solid #ccc;
    }
    tr {
      border-bottom: 1px solid #ccc;
    }
  }
  img {
    width: 16px;
  }
`

export default TokenTable;