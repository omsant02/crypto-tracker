import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TopCryptoList.css"; // Import the CSS file

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

const TopCryptoList = () => {
  const [topCryptos, setTopCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/crypto/cryptos"
        );
        setTopCryptos(response.data.topCryptos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="top-crypto-list">
      <div className="header">
        <div className="coin">Coin</div>
        <div className="price">Price</div>
        <div className="change">24h Change</div>
        <div className="market-cap">Market Cap</div>
      </div>
      <div className="crypto-list">
        {topCryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-item">
            <div className="coin">
              <img
                src={crypto.image}
                alt={`${crypto.name} logo`}
                width="24"
                height="24"
              />
              <span>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </span>
            </div>
            <div className="price">₹ {crypto.current_price.toFixed(2)}</div>
            <div
              className={`change ${
                crypto.price_change_percentage_24h >= 0
                  ? "positive"
                  : "negative"
              }`}
            >
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="market-cap">
              ₹ {crypto.market_cap.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCryptoList;
