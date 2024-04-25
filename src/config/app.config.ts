import { IsNumber, IsString, Min } from 'class-validator';

export class AppConfig {
  @IsNumber()
  @Min(1024)
  port: number;

  @IsString()
  database_host: string;

  @IsNumber()
  @Min(1024)
  database_port: number;

  constructor(port: number, database_host: string, database_port: number) {
    this.port = port;
    this.database_host = database_host;
    this.database_port = database_port;
  }
}
