import { Server as SocketIOServer } from "socket.io";

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    const { userId, deviceId } = socket.handshake.query; // Extract both userId and deviceId from query

    if (userId && deviceId) {
      // Join a room based on both userId and deviceId
      const roomName = `${userId}-${deviceId}`;
      socket.join(roomName);
      console.log(`User ${userId} with device ${deviceId} connected.`);

      socket.on("disconnect", () => {
        console.log(`User ${userId} disconnected`);
      });

      socket.on("error", (error) => {
        console.error(`Socket.IO error for user ${userId}:`, error);
      });
    } else {
      socket.disconnect(true);
      //   console.error("Missing userId or deviceId in connection query");
    }
  });

  return io;
};

export default setupSocket;
