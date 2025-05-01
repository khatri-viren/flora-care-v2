import * as mqtt from "mqtt";
import { handleDeviceDiscovery, handleOtherMessages } from "./handlers.js";

const mqttOptions = {
  host: process.env.EMQX_HOST,
  port: 8883,
  protocol: "mqtts",
  username: process.env.EMQX_USERNAME,
  password: process.env.EMQX_PASSWORD,
};

const mqttClient = mqtt.connect(mqttOptions);

const topicPrefix = process.env.MQTT_TOPIC_PREFIX;
mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");

  const topics = [`${topicPrefix}/#`, `${topicPrefix}/device/discovery/#`];
  //  prod/#
  //  prod/device/discovery/#

  mqttClient.subscribe(topics, (err) => {
    if (!err) {
      console.log(`Subscribed to topics: ${topics.join(", ")}`);
    } else {
      console.error("Failed to subscribe to topics", err);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  const data = JSON.parse(message.toString());
  if (topic.startsWith("device/discovery/")) {
    handleDeviceDiscovery(topic, data);
  } else {
    handleOtherMessages(data);
  }
});

export default mqttClient;
