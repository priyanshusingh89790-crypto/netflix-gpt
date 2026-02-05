import express from "express";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
