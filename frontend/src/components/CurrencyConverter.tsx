import React, { useState, useEffect } from "react";
import axios from "axios";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

const CurrencyConverter = () => {
  const [topCryptos, setTopCryptos] = useState<Crypto[]>([]);
  const [supportedCurrencies, setSupportedCurrencies] = useState<string[]>([]);
  const [sourceCrypto, setSourceCrypto] = useState("");
  const [amount, setAmount] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("usd");
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/crypto/cryptos");
        setTopCryptos(response.data.topCryptos);
        setSupportedCurrencies(response.data.supportedCurrencies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get("/api/v1/conversion/convert", {
        params: {
          sourceCrypto,
          amount,
          targetCurrency,
        },
      });

      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sourceCrypto">Source Cryptocurrency:</label>
          <select
            id="sourceCrypto"
            value={sourceCrypto}
            onChange={(e) => setSourceCrypto(e.target.value)}
          >
            <option value="">Select a cryptocurrency</option>
            {topCryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="targetCurrency">Target Currency:</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {supportedCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Convert</button>
      </form>
      {convertedAmount > 0 && (
        <div>
          <p>
            {amount} {sourceCrypto.toUpperCase()} = {convertedAmount}{" "}
            {targetCurrency.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
