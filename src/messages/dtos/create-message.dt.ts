/**
 * DTO for creating a message payload.
 *
 * This file demonstrates how NestJS request contracts are described with
 * TypeScript types plus validation decorators from class-validator.
 */
import { IsString } from 'class-validator';

export class CreateMessageDto {
  /**
   * Message text submitted by the client.
   *
   * The string validation rule ensures only valid text values are accepted.
   */
  @IsString()
  content!: string;
}