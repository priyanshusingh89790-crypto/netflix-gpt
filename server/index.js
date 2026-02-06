import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());


app.use("/api/ai", aiRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
