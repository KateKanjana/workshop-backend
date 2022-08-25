import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MicroservicePayloadDTO } from '../common/dto/microservice-payload.dto';
import { MESSAGE_PATTERN } from './tcp.constants';
import { TCPService } from './tcp.service';

@Injectable()
@Controller()
export class TCPController {
  constructor(private readonly tcpService: TCPService) {}

  @MessagePattern(MESSAGE_PATTERN)
  messageHandler(payload: MicroservicePayloadDTO) {
    return this.tcpService.onTCPMessageHandler(payload);
  }

  // wait for nest 8.0.0 for multiple event handler
  // @EventPattern(EVENT_PATTERN)
  // async eventHandler(data: Record<string, unknown>) {
  //   console.log('eventHandler', data);
  // }
}
