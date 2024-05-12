import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../components/CurrencyConverter.css";

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
        const response = await axios.get(
          "http://localhost:5000/api/v1/crypto/cryptos"
        );
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
      const response = await axios.get(
        "http://localhost:5000/api/v1/conversion/convert",
        {
          params: {
            sourceCrypto,
            amount,
            targetCurrency,
          },
        }
      );

      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md border border-blue-300 border-solid rounded-2xl mt-10">
      {" "}
      <h1 className="text-3xl font-bold mb-6 text-white">Currency Converter</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="sourceCrypto"
            className="text-sm font-medium mb-1 text-white"
          >
            Source Cryptocurrency:
          </label>
          <select
            id="sourceCrypto"
            value={sourceCrypto}
            onChange={(e) => setSourceCrypto(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select a cryptocurrency</option>
            {topCryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="text-sm font-medium mb-1 text-white"
          >
            Amount:
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="targetCurrency"
            className="text-sm font-medium mb-1 text-white"
          >
            Target Currency:
          </label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            {supportedCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Convert
        </button>
      </form>
      {convertedAmount > 0 && (
        <div className="text-center mt-4 text-xl font-bold">
          <p className="text-white">
            {amount} {sourceCrypto.toUpperCase()} = {convertedAmount}{" "}
            {targetCurrency.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
