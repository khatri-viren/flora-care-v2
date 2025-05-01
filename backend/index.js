import { config } from "dotenv";
config();

import { server } from "./src/server.js";
import mqttClient from "./src/mqtt/client.js";

// some change
server.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
