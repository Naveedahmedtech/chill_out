import { IsNumber, IsString, Min } from 'class-validator';

export class AppConfig {
  @IsNumber()
  @Min(1024)
  port: number;

  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  @Min(1024)
  database_port: number;

  @IsString()
  api_key: string;

  constructor(
    port: number,
    DATABASE_URL: string,
    database_port: number,
    api_key: string,
  ) {
    this.port = port;
    this.DATABASE_URL = DATABASE_URL;
    this.database_port = database_port;
    this.api_key = api_key;
  }
}
