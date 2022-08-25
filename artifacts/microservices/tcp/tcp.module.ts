import { Module } from '@nestjs/common';
import { TCPController } from './tcp.controller';
import { TCPService } from './tcp.service';

@Module({
  controllers: [TCPController],
  providers: [TCPService],
  exports: [TCPService],
})
export class TCPModule {}
