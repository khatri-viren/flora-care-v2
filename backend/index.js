import { config } from "dotenv";
config();

import { server } from "./src/server.js";
import mqttClient from "./src/mqtt/client.js";

server.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
