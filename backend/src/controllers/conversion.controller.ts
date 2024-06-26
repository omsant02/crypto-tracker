import { Request, Response } from "express";
import axios from "axios";

export const convertCurrency = async (req: Request, res: Response) => {
  const { sourceCrypto, amount, targetCurrency } = req.query as {
    sourceCrypto: string;
    amount: string;
    targetCurrency: string;
  };

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: sourceCrypto,
          vs_currencies: targetCurrency,
        },
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
        },
      }
    );

    const exchangeRate = response.data[sourceCrypto][targetCurrency];
    const convertedAmount = parseFloat(amount) * exchangeRate;

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to convert currency" });
  }
};
