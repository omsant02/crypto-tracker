import express from "express";
import cors from "cors";
import cryptoRoutes from "./routes/crypto.routes";
import conversionRoutes from "./routes/conversion.routes";

const app = express();

app.use(cors());

app.use("/api/v1/crypto", cryptoRoutes);
app.use("/api/v1/conversion", conversionRoutes);

export default app;
