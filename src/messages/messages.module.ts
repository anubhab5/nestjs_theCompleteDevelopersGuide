/**
 * Feature module for the messages API.
 *
 * This module groups the controller and keeps the validation-related learning
 * logic scoped to the messages feature area.
 */
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';

@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
