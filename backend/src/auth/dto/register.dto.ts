import { IsEmail, IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({ example: "cyberh4cker" })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: "Username can only contain letters, numbers, underscores, and hyphens",
  })
  username: string;

  @ApiProperty({ example: "hacker@cyberquest.io" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecureP@ss123" })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
