import axios from "axios";
import { getTopCryptosAndSupportedCurrencies } from "../src/controllers/crypto.controller";
import { Response } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getTopCryptosAndSupportedCurrencies", () => {
  const mockRequest = {} as any;

  const mockResponse: Partial<Response> = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch top cryptos and supported currencies successfully", async () => {
    const mockCryptoData = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: { thumb: "https://example.com/bitcoin.png" },
        current_price: 50000,
        price_change_percentage_24h: 2.5,
        market_cap: 1000000000,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockCryptoData });

    await getTopCryptosAndSupportedCurrencies(
      mockRequest,
      mockResponse as Response
    );

    expect(mockResponse.json).toHaveBeenCalledWith({
      topCryptos: [
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "btc",
          image: "https://example.com/bitcoin.png",
          current_price: 50000,
          price_change_percentage_24h: 2.5,
          market_cap: 1000000000,
        },
      ],
      supportedCurrencies: ["inr", "usd", "eur", "gbp"],
    });
  });

  it("should handle error when fetching top cryptos fails", async () => {
    const errorMessage = "Failed to fetch crypto data";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await getTopCryptosAndSupportedCurrencies(
      mockRequest,
      mockResponse as Response
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
