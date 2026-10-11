import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dt';

@Controller('messages')
export class MessagesController {

    @Get()
    public listMessages() { /** */}

    @Post()
    public createMessage(@Body() body: CreateMessageDto) { /** */ }

    @Get('/:id')
    public getMessage() { /** */ }

}
