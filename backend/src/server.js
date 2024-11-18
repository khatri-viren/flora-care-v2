import express from "express";
import http from "http";
import cors from "cors";

export const app = express();
app.use(cors());
export const server = http.createServer(app);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Server is up and running", status: 200 });
});

// Socket.IO setup
import setupSocket from "./socket/io.js";
export const io = setupSocket(server);
