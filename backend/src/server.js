import express from "express";
import http from "http";
import cors from "cors";
import mqttClient from "./mqtt/client.js";

export const app = express();
app.use(express.json());
app.use(cors());
export const server = http.createServer(app);

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Server is up and running", status: 200 });
});

app.post("/api/device/command", async (req, res) => {
  console.log(req.body);
  const { deviceId, command } = req.body;

  if (!deviceId || !command) {
    return res.status(400).json({ message: "Missing deviceId or command" });
  }

  const topic = `devices/${deviceId}/command`; // Construct the MQTT topic
  const payload = JSON.stringify({ command: command }); // Construct the JSON payload

  try {
    mqttClient.publish(topic, payload); // Publish the MQTT message
    console.log(`Published command "${command}" to topic "${topic}"`);
    res.status(200).json({
      success: true,
      message: `Command "${command}" sent to device ${deviceId}`,
    });
  } catch (error) {
    console.error("Error publishing MQTT message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send command to MQTT broker",
    });
  }
});
// Socket.IO setup
import setupSocket from "./socket/io.js";
export const io = setupSocket(server);
