const { WebSocketServer } = require("ws");

let rooms = {}; 

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", (ws, req, meetingId) => {
    if (!rooms[meetingId]) rooms[meetingId] = [];
    rooms[meetingId].push(ws);

    console.log(`✅ Client connected to room: ${meetingId}`);

    ws.on("message", (message) => {
      console.log(`💬 Message from ${meetingId}: ${message}`);

      // broadcast to others in room
      rooms[meetingId].forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(message.toString());
        }
      });
    });

    ws.on("close", () => {
      rooms[meetingId] = rooms[meetingId].filter((c) => c !== ws);
      console.log(`❌ Client left room: ${meetingId}`);
    });
  });

  server.on("upgrade", (req, socket, head) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const meetingId = url.searchParams.get("meetingId");

    if (!meetingId) {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req, meetingId);
    });
  });
};

module.exports = { setupWebSocket };
