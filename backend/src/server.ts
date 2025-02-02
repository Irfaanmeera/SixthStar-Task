import http from "http";
import app from "./app";
import dotenv from 'dotenv';
import { connectDb } from "./config/database";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});