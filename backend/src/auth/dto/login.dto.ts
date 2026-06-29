import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "hacker@cyberquest.io" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecureP@ss123" })
  @IsString()
  password: string;
}
