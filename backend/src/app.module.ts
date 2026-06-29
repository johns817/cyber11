import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LabsModule } from "./labs/labs.module";
import { ChallengesModule } from "./challenges/challenges.module";
import { GamificationModule } from "./gamification/gamification.module";
import { TeamsModule } from "./teams/teams.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { RoomsModule } from "./rooms/rooms.module";
import { EventsModule } from "./events/events.module";
import { CertificationsModule } from "./certifications/certifications.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "cyberquest"),
        password: configService.get("DB_PASSWORD", "cyberquest"),
        database: configService.get("DB_NAME", "cyberquest"),
        entities: [__dirname + "/database/entities/*.entity{.ts,.js}"],
        synchronize: configService.get("NODE_ENV") !== "production",
        logging: configService.get("NODE_ENV") === "development",
      }),
    }),
    AuthModule,
    UsersModule,
    LabsModule,
    ChallengesModule,
    GamificationModule,
    TeamsModule,
    NotificationsModule,
    RoomsModule,
    EventsModule,
    CertificationsModule,
  ],
})
export class AppModule {}
