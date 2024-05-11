import express from "express";
import { convertCurrency } from "../controllers/conversion.controller";

const router = express.Router();

router.get("/convert", convertCurrency);

export default router;
