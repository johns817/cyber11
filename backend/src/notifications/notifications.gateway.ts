import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/notifications",
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendNotification(userId: string, notification: { type: string; message: string; data?: unknown }) {
    this.server.to(userId).emit("notification", notification);
  }

  sendLeaderboardUpdate(data: unknown) {
    this.server.emit("leaderboard:update", data);
  }

  sendLabStatusUpdate(labId: string, status: string) {
    this.server.emit("lab:status", { labId, status });
  }
}
