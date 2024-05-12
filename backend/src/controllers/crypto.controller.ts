// controllers/crypto.controller.ts
import { Request, Response } from "express";
import axios from "axios";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: { thumb: string };
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export const getTopCryptosAndSupportedCurrencies = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "inr",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      }
    );

    const supportedCurrencies = ["inr", "usd", "eur", "gbp"];
    const topCryptos = response.data.map((crypto: CryptoData) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      image: crypto.image.thumb,
      current_price: crypto.current_price,
      price_change_percentage_24h: crypto.price_change_percentage_24h,
      market_cap: crypto.market_cap,
    }));

    res.json({ topCryptos, supportedCurrencies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
};
