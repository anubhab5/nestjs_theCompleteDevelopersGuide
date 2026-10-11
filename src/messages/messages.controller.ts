/**
 * Controller for message-related HTTP endpoints.
 *
 * This file is part of the DTO validation learning branch and shows how request
 * bodies are typed against a DTO before being processed by the application.
 */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dt';

@Controller('messages')
export class MessagesController {
  /**
   * Lists all messages.
   * This placeholder is kept intentionally minimal for the feature study.
   */
  @Get()
  public listMessages() {
    /** */
  }

  /**
   * Creates a new message using a validated DTO body.
   *
   * The body argument is validated automatically when a ValidationPipe is active.
   */
  @Post()
  public createMessage(@Body() body: CreateMessageDto) {
    /** */
    return body;
  }

  /**
   * Returns one message by id.
   * Not yet implemented; kept for the feature skeleton.
   */
  @Get('/:id')
  public getMessage() {
    /** */
  }
}
