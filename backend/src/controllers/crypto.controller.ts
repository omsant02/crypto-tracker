// controllers/crypto.controller.ts
import { Request, Response } from "express";
import axios from "axios";

export const getTopCryptosAndSupportedCurrencies = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    const supportedCurrencies = ["usd", "eur", "gbp"];

    res.json({ topCryptos: response.data, supportedCurrencies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
};
