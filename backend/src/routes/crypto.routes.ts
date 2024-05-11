import express from "express";
import { getTopCryptosAndSupportedCurrencies } from "../controllers/crypto.controller";

const router = express.Router();

router.get("/cryptos", getTopCryptosAndSupportedCurrencies);

export default router;
