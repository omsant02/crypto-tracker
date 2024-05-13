import axios from "axios";
import { convertCurrency } from "../src/controllers/conversion.controller";
import { Response } from "express";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("convertCurrency", () => {
  const mockRequest = {
    query: {
      sourceCrypto: "bitcoin",
      amount: "1",
      targetCurrency: "usd",
    },
  } as any;

  const mockResponse: Partial<Response> = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    sendStatus: jest.fn(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should convert currency successfully", async () => {
    const exchangeRate = 50000;
    mockedAxios.get.mockResolvedValueOnce({
      data: { bitcoin: { usd: exchangeRate } },
    });

    await convertCurrency(mockRequest, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalledWith({ convertedAmount: 50000 });
  });

  it("should handle error when fetching exchange rates fails", async () => {
    const errorMessage = "Failed to fetch exchange rates";
    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await convertCurrency(mockRequest, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Failed to convert currency",
    });
  });
});
